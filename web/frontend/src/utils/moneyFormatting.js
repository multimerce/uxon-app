export const moneyFormatting = (value, moneyFormat, currency = '$') => {

    // TODO: add money format from store settings
    const stringValue = value.toString();
    return currency.concat(' ', stringValue);
};