Form customization

This xpl has in input a form.xhtml and a parameter tree containing the campaign, the unit, the model, sometimes the identifier.

1. We recover the instance.
2. We get the identifier with which we access the questionnaire.
3. We retrieve the control information we need. If we are connected as an internal user, we will retrieve the main contact.
4. We apply a first xsl to build the final form from the form, the instance and the piloting data.
5. We apply a second xsl to customize the Danish character part.
