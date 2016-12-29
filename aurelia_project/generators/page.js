import {inject} from 'aurelia-dependency-injection';
import {Project, ProjectItem, CLIOptions, UI} from 'aurelia-cli';

@inject(Project, CLIOptions, UI)
export default class PageGenerator {
  constructor(project, options, ui) {
    this.project = project;
    this.options = options;
    this.ui = ui;
  }

  execute() {
    return this.ui
      .ensureAnswer(this.options.args[0], 'What would you like to call the new item?')
      .then(name => {
        let fileName = this.project.makeFileName(name);
        let className = this.project.makeClassName(name);

        this.project.root.add(
          ProjectItem.text(`${fileName}/${fileName}.js`, this.generateClass(className)),
          ProjectItem.text(`${fileName}/${fileName}.html`, this.generateHtml(className)),
          ProjectItem.text(`${fileName}/${fileName}.less`, this.generateLess(className))
        );

        return this.project.commitChanges()
          .then(() => this.ui.log(`Created ${fileName}.`));
      });
  }

  generateClass(className) {
return `import {inject} from 'aurelia-framework';

@inject()
export class ${className} {
  
    constructor() {

    }


}
`
  }

  generateHtml(className) {
return `<template>
    <require from="./${className.toLowerCase()}.css"></require>
    ${className} 
</template>
`
  }

  generateLess(className) {
return `
@import (reference) "./less/less";
`
  }

}

