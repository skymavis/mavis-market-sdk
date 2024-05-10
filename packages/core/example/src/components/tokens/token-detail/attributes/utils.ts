import { Attribute, AttributeType, TraitDistribution } from '@sky-mavis/mavis-market-core';

export const parseAttributes = (attributes: Attribute | null, traitDistribution: TraitDistribution[]) => {
  const mappedAttributes = traitDistribution.reduce((data, attribute) => {
    const { key, value, displayType } = attribute;
    const traitKey: string = displayType === AttributeType.String ? `${key}-${value}` : key;
    return {
      ...data,
      [traitKey]: attribute as TraitDistribution,
    };
  }, {} as { [key: string]: TraitDistribution });

  return Object.entries(attributes || {}).reduce((fullAttributes, attribute) => {
    const [key, value] = attribute;
    const attributeValues = value.map(attributeValue => {
      const traitKey = `${key}-${attributeValue}`;
      const { percentage, displayType, count } = mappedAttributes[traitKey] || mappedAttributes[key] || {};
      return { key, count, percentage, value: attributeValue, displayType: displayType || AttributeType.String };
    });
    return [...fullAttributes, ...attributeValues];
  }, [] as TraitDistribution[]);
};
