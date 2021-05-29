from pandas.api.types import is_numeric_dtype


def get_cat_features(X):
    """
    :param x: a Data Frame
    :return: indices of categorical columns
    """
    return [ind for ind in range(X.shape[1]) if ~X.dtypes.apply(is_numeric_dtype).to_numpy()[ind]]


# - returns the names of the categorical features in the input (used for Catboost)
def get_cat_feature_names(X):
    """

    :param X: the input features (a DataFrame)
    :return: the names of the categorical features
    """
    return X.columns[~X.dtypes.apply(is_numeric_dtype).to_numpy()]
