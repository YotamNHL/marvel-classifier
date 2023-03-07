import pandas as pd
import numpy as np
import yaml

from utils.general_utils import *
from catboost import CatBoostClassifier
import json
import shap
from scipy.spatial.distance import euclidean
from sklearn.preprocessing import MinMaxScaler


def ready_df_for_similarity(given_df):
    for col in given_df.columns:
        if given_df[col].dtypes == bool:
            given_df[col] = given_df[col].astype(int)

    given_df['Gender'] = given_df['Gender'].apply(lambda x: 1 if x == 'Male' else 0)
    cat_cols = ['Race', 'EyeColor', 'HairColor']
    for col in cat_cols:
        col_values = list(given_df[col].value_counts().index.to_list())
        for value in col_values:
            new_col_name = str(col) + "_" + str(value)
            given_df[new_col_name] = given_df[col].apply(lambda x: 1 if str(x).lower() == str(value).lower() else 0)

    given_df = given_df.drop(cat_cols, axis=1)
    return given_df


def aggregate_features(given_df, with_class=True):
    top_features = yaml.safe_load(open('./config.yaml', 'r'))['top_features']
    print("THE TOP FEATURES ARE")
    print(top_features)
    if with_class:
        top_features.append('class')

    given_df = given_df.loc[:, top_features]
    given_df['is_human'] = given_df['Race'].apply(lambda x: True if 'Human' in x else False)
    given_df['is_mutant'] = given_df['Race'].apply(lambda x: True if 'Mutant' in x else False)
    given_df['has_blue_eyes'] = given_df['EyeColor'].apply(lambda x: True if x == 'blue' else False)
    cols = list(given_df.columns)
    cat_cols = ['Gender', 'EyeColor', 'Race', 'HairColor']
    int_cols = ['Height', 'Weight', 'Intelligence', 'Strength',
                'Speed', 'Durability', 'Power', 'Combat']
    bool_cols = [x for x in cols if (x not in cat_cols and x not in int_cols)]

    given_df[cat_cols] = given_df[cat_cols].fillna(value='no_value')
    given_df[int_cols] = given_df[int_cols].fillna(value=0)
    given_df[bool_cols] = given_df[bool_cols].fillna(value=False)

    # cast int cols to int type
    for col in int_cols:
        given_df[col] = given_df[col].astype(int)

    if with_class:
        # Handle sparsing in haircolor values
        haircolors_5_or_less = given_df['HairColor'].value_counts()
        haircolors_5_or_less = haircolors_5_or_less.loc[haircolors_5_or_less < 5].index.tolist()
        print(haircolors_5_or_less)
        given_df['HairColor'] = given_df['HairColor'].apply(
            lambda x: "Black" if x == 'black' else 'Other' if x in haircolors_5_or_less else x)

        # Handle sparsing in eyecolor values
        eyecolors_5_or_less = given_df['EyeColor'].value_counts()
        eyecolors_5_or_less = eyecolors_5_or_less.loc[eyecolors_5_or_less < 5].index.tolist()
        print(eyecolors_5_or_less)
        eyecolors_5_or_less.append('no_value')
        given_df['EyeColor'] = given_df['EyeColor'].apply(lambda x: 'Other' if x in eyecolors_5_or_less else x)

        # Handle sparsing in race values
        race_3_or_less = given_df['Race'].value_counts()
        race_3_or_less = race_3_or_less.loc[race_3_or_less < 3].index.tolist()
        print(race_3_or_less)
        race_3_or_less.append('Unknown Race')
        given_df['Race'] = given_df['Race'].apply(lambda x: 'Unknown Race' if x in race_3_or_less else x)

    given_df['Total'] = given_df['Intelligence'] + given_df['Strength'] + given_df['Speed'] + given_df['Durability'] + \
                        given_df['Power'] + given_df['Combat']
    superpowers_cols = bool_cols
    for col in ['is_human', 'is_mutant', 'has_blue_eyes']:
        superpowers_cols.remove(col)

    given_df['amount_of_superpowers'] = given_df[superpowers_cols].astype(int).sum(axis=1)
    given_df['amount_of_superpowers_per_strength'] = given_df['amount_of_superpowers'] / (given_df['Strength'] + 1)
    given_df['amount_of_superpowers_per_power'] = given_df['amount_of_superpowers'] / (given_df['Power'] + 1)
    given_df['bmi'] = abs(given_df['Weight']) / (abs(given_df['Height']) / 100) ** 2.

    given_df = given_df.reset_index()
    given_df = given_df.reindex(sorted(given_df.columns), axis=1)
    return given_df


def get_hero_proba(given_str):
    given_dict = json.loads(given_str)
    given_df = pd.DataFrame(given_dict, index=[0])
    df = pd.read_csv('data/marvel_demo_stats_powers.csv')
    df = df.replace('-', 'no_value')
    df['EyeColor'] = df['EyeColor'].apply(lambda
                                              x: 'green' if 'green' in x else 'blue' if 'blue' in x else 'yellow' if 'yellow' in x else 'white' if 'white' in x else x)
    df['class'] = df['Alignment_x'].apply(lambda x: True if x == 'bad' else False)

    df = aggregate_features(df, with_class=True)
    given_df_aggregated = aggregate_features(given_df, with_class=False)
    X, y = df.drop(['index', 'class'], axis=1), df['class']

    cbc = CatBoostClassifier(cat_features=get_cat_feature_names(X), class_weights=[0.33, 0.67], random_state=5,
                             bootstrap_type='Bayesian', rsm=0.1, verbose=0)
    cbc.fit(X, y)
    result = cbc.predict(given_df_aggregated)
    proba = list(cbc.predict_proba(given_df_aggregated))
    certainty = 100.0 * max(proba[0])
    shap_values = shap.TreeExplainer(cbc).shap_values(given_df_aggregated)
    shap_list = list(shap_values)[0]
    final_payload = []
    i = 0
    features = given_df_aggregated.columns
    for value in shap_list:
        temp_dict = {}
        temp_dict['feature'] = features[i]
        temp_dict['score'] = value
        final_payload.append(temp_dict)
        i += 1

    final_payload_sorted = sorted(final_payload, key=lambda k: k['score'], reverse=True)
    top_five_indicators = final_payload_sorted[:7]
    final_indicators_list = []
    for feature in top_five_indicators:
        final_indicators_list.append(feature['feature'])

    final_result_dict = {}
    final_result_dict['result'] = True if result[0] == 'True' else False
    final_result_dict['certainty'] = round(certainty, 2)
    final_result_dict['indicators'] = final_indicators_list

    df = df.drop('index', axis=1)
    given_sample = given_df_aggregated.drop('index', axis=1)
    given_sample['class'] = 1 if final_result_dict['result'] else 0
    df_with_sample = pd.concat([df, given_sample], ignore_index=True)
    df_with_sample_for_similarity = ready_df_for_similarity(df_with_sample)
    # scaler = StandardScaler()
    scaler = MinMaxScaler()
    df_with_sample_scaled = pd.DataFrame(scaler.fit_transform(df_with_sample_for_similarity), columns=df_with_sample_for_similarity.columns)
    result = given_sample['class'][0]
    df_with_sample_scaled = df_with_sample_scaled.drop(['is_human', 'is_mutant', 'has_blue_eyes', 'amount_of_superpowers', 'class'], axis=1)
    df_for_similarity_scaled = df_with_sample_scaled.iloc[:-1, :]
    given_sample_for_similarity_scaled = df_with_sample_scaled.iloc[-1, :]

    dists = [euclidean(given_sample_for_similarity_scaled, df_for_similarity_scaled.iloc[i]) for i in range(df_for_similarity_scaled.shape[0])]
    original_df = pd.read_csv('data/marvel_demo_stats_powers.csv')
    closet_obs = original_df.iloc[np.argmin(dists)]
    final_result_dict['similar_character'] = closet_obs['Name']

    return final_result_dict


sample_df = pd.DataFrame(columns=['Gender', 'EyeColor', 'HairColor', 'Race',
                                  'Height', 'Weight', 'Intelligence', 'Strength', 'Stamina',
                                  'Speed', 'Durability', 'Power', 'Combat',
                                  'Enhanced Senses',
                                  'Flight',
                                  'Energy Blasts',
                                  'Energy Absorption',
                                  'Shapeshifting',
                                  'Accelerated Healing',
                                  'Force Fields',
                                  'Psionic Powers',
                                  'Weapon-based Powers',
                                  'Energy Manipulation',
                                  'Reflexes',
                                  'Molecular Manipulation',
                                  'Super Durability',
                                  'Agility',
                                  'Longevity',
                                  'Super Speed',
                                  'Super Strength',
                                  'Stealth'
                                  ], data=[['Female', 'Blue', 'Blonde', 'Human',
                                            '170', '120', '80', '80', '50', '50', '60', '100', '70',
                                            False, True, False, False, True, False, False, True,
                                            False, False, True, False, True, True, True, False, True, False
                                            ]])

str_sample = json.dumps(sample_df.to_json())
