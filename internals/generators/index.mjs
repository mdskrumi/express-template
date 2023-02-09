export default function (plop) {
    // controller generator
    plop.setGenerator('module', {
        description: 'Add a new module',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'what is the name of the module? (lowercase)',
            },
        ],
        actions: [
            {
                type: 'add',
                path: '../../src/modules/{{name}}/{{name}}.controller.ts',
                templateFile: '../templates/controller.hbs',
            },
            {
                type: 'add',
                path: '../../src/modules/{{name}}/{{name}}.enum.ts',
                templateFile: '../templates/enum.hbs',
            },
            {
                type: 'add',
                path: '../../src/modules/{{name}}/{{name}}.interface.ts',
                templateFile: '../templates/interface.hbs',
            },
            {
                type: 'add',
                path: '../../src/modules/{{name}}/{{name}}.model.ts',
                templateFile: '../templates/model.hbs',
            },
            {
                type: 'add',
                path: '../../src/modules/{{name}}/{{name}}.service.ts',
                templateFile: '../templates/service.hbs',
            },
            {
                type: 'add',
                path: '../../src/modules/{{name}}/{{name}}.validation.ts',
                templateFile: '../templates/validation.hbs',
            },
        ],
    });
}
