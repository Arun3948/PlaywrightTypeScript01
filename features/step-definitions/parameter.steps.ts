import { defineParameterType } from '@cucumber/cucumber';
import { actorCalled, actorInTheSpotlight } from '@serenity-js/core';

defineParameterType({
    regexp: /[A-Z][a-z]+/,
    transformer(name: string) {
        return actorCalled(name);
    },
    //name: 'actor',
    name: 'Agent',
});

defineParameterType({
    regexp: /he|she|they|his|her|their|Agent/,
    transformer() {
        return actorInTheSpotlight();
    },
    name: 'pronoun',
});
