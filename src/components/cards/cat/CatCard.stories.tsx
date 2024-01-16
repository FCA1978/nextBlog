import { ComponentStory, ComponentMeta } from '@storybook/react';
import CatCard, { ICatCard} from './CatCard';
import { mockBaseTemplateProps } from './CatCard.mocks'

export default {
    title: 'templates/BaseTemplate',
    component: CatCard,
    argTypes: {},
} as ComponentMeta<typeof CatCard>;
  
const Template: ComponentStory<typeof CatCard> = (args) => (
    <CatCard{...args} />
);

export const Base = Template.bind({});

Base.args = {
    ...mockBaseTemplateProps.base,
} as ICatCard;