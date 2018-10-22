module.exports = {


  friendlyName: 'Send email',


  description: 'Send emails with a template',


  inputs: {
    template: {
      description: 'EJS template name',
      example: 'password-verify',
      type: 'string',
      required: true,
    },

    layout: {
      description: 'EJS email layout, false will remove layout entirely',
      defaultsTo: 'layout-email',
      custom: layout => layout === false || _.isString(layout)
    },

    templateData: {
      description: 'Collection of template data, accessible within EJS template',
      type: {},
      defaultsTo: {},
    },

    to: {
      description: 'Recipients email address',
      type: 'string',
      isEmail: true,
      required: true,
    },

    subject: {
      description: 'Subject for email',
      type: 'string',
      defaultsTo: '',
    },

  },


  fn: async function (inputs, exits) {
    // Include Node Core modules
    const path = require('path');
    const url = require('url');
    const util = require('util');

    // Get the email templates full path
    const templatePath = path.join('emails/', inputs.template);

    // Get email layout template
    let layout = inputs.layout ?
      path.relative(path.dirname(templatePath),
        path.resolve('layouts/', inputs.layout))
      : false;


    // Render email HTML
    const emailContents = await sails.renderView(
      templatePath,
      Object.assign({layout, url, util}, inputs.templateData)
    );

    let {fromEmailAddress, mailgunDomain, mailgunSecret, mailgunTestMode} = sails.config.custom;

    // Use Mailgun helper to send email!
    await sails.helpers.mailgun.sendHtmlEmail.with({
      htmlMessage: emailContents,
      to: inputs.to,
      from: fromEmailAddress,
      domain: mailgunDomain,
      secret: mailgunSecret,
      subject: inputs.subject,
      testMode: mailgunTestMode
    });

    // All done.
    return exits.success();

  }


};

