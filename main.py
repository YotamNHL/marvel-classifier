import pandas as pd
import os
from utils.general_utils import *
from catboost import CatBoostClassifier
from utils.plot_utils import *
import json


def aggregate_features(given_df, with_class=True):
    top_features = [
                    # categorical features
                    'Gender',
                    'HairColor',
                    'EyeColor',
                    'Race',
                    # int features
                    'Strength',
                    'Speed',
                    'Durability',
                    'Power',
                    'Combat',
                    'Intelligence',
                    'Height',
                    'Weight',
                    # Boolean features
                    'Super Strength',
                    'Stamina',
                    'Stealth',
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
                    'Super Speed']
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
    if not with_class:
        print(given_df['Intelligence'])
        print(given_df['Strength'])
        print(given_df['Speed'])
        print(given_df['Durability'])
        print(given_df['Power'])
        print(given_df['Combat'])
        print(list(given_df.columns))



    given_df[cat_cols] = given_df[cat_cols].fillna(value='no_value')
    given_df[int_cols] = given_df[int_cols].fillna(value=0)
    given_df[bool_cols] = given_df[bool_cols].fillna(value=False)
    # cast int cols to int type
    for col in int_cols:
        given_df[col] = given_df[col].astype(int)

    given_df['Total'] = given_df['Intelligence'] + given_df['Strength'] + given_df['Speed'] + given_df['Durability'] + given_df['Power'] + given_df['Combat']
    superpowers_cols = bool_cols
    for col in ['is_human', 'is_mutant', 'has_blue_eyes']:
        superpowers_cols.remove(col)

    given_df['amount_of_superpowers'] = given_df[superpowers_cols].astype(int).sum(axis=1)



    given_df = given_df.reset_index()
    given_df = given_df.reindex(sorted(given_df.columns), axis=1)
    return given_df


def get_hero_proba(given_str):
    given_dict = json.loads(given_str)
    print(os.getcwd())
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
                             bootstrap_type='Bayesian', rsm=0.1)
    cbc.fit(X, y)
    result = cbc.predict(given_df_aggregated)
    print(result)
    return result


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
                                  ], data=[['Male', 'Blue', 'Blonde', 'Mutant',
                                            '170', '100', '80', '80', '50', '50', '60', '100', '70',
                                            True, False, True, False, False, False, True, False,
                                            True, False, False, False, False, False, False, False, True, False
                                            ]])
