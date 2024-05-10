import Typography from '@components/common/typography/Typography';
import WillRender from '@components/common/will-render/WillRender';
import { Attribute, TraitDistribution } from '@sky-mavis/mavis-market-core';
import { isEmpty } from 'lodash';
import { FC } from 'react';

import AttributeItem from './attribute-item/AttributeItem';
import { parseAttributes } from './utils';

import styles from './Attributes.module.scss';

interface AttributesProps {
  traitDistribution: TraitDistribution[];
  attributes: Attribute | null;
}

const Attributes: FC<AttributesProps> = props => {
  const { traitDistribution, attributes } = props;
  const parsedAttributes = parseAttributes(attributes, traitDistribution);

  return (
    <div className={styles.attributesContainer}>
      <Typography size="medium">Properties</Typography>
      <WillRender when={!isEmpty(parsedAttributes)}>
        <div className={styles.attributes}>
          {parsedAttributes.map(attribute => (
            <AttributeItem key={`${attribute.key}-${attribute.value}`} attribute={attribute} />
          ))}
        </div>
      </WillRender>
      <WillRender when={isEmpty(parsedAttributes)}>
        <Typography>No properties found</Typography>
      </WillRender>
    </div>
  );
};

export default Attributes;
