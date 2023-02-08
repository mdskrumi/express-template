export default function (plop) {
    // controller generator
    plop.setGenerator('module', {
        description: 'Add a new module',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'what is the name of the module?',
            },
        ],
        actions: [
            {
                type: 'add',
                path: '../../src/modules/{{name}}/{{name}}.controller.ts',
                // templateFile: 'plop-templates/controller.hbs',
            },
            {
                type: 'add',
                path: '../../src/modules/{{name}}/{{name}}.enum.ts',
                // templateFile: 'plop-templates/controller.hbs',
            },
            {
                type: 'add',
                path: '../../src/modules/{{name}}/{{name}}.interface.ts',
                // templateFile: 'plop-templates/controller.hbs',
            },
            {
                type: 'add',
                path: '../../src/modules/{{name}}/{{name}}.model.ts',
                // templateFile: 'plop-templates/controller.hbs',
            },
            {
                type: 'add',
                path: '../../src/modules/{{name}}/{{name}}.service.ts',
                // templateFile: 'plop-templates/controller.hbs',
            },
            {
                type: 'add',
                path: '../../src/modules/{{name}}/{{name}}.validation.ts',
                // templateFile: 'plop-templates/controller.hbs',
            },
        ],
    });
}
