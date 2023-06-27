import { test, expect } from '@playwright/test';

test('Questionnaire Controles Composants', async ({ page }) => {
  const jsonLunatic = '/static/questionnaire/tous-composants/form.json';
  const serveur = 'http://localhost:3000';
  await page.goto(serveur + '/visualize');

  await page
    .getByPlaceholder(
      'http://localhost:3000/static/questionnaire/simpsons/form.json'
    )
    .fill(serveur + jsonLunatic);
  await page.getByRole('button', { name: 'Visualiser', exact: true }).click();
  //   expect(page.url()).toEqual(serveur + jsonLunatic);
  await expect(
    page.getByRole('heading', {
      name: 'QNONREG - Questionnaire tous composants',
    })
  ).toBeVisible();
  await expect(page.getByText('Début')).toBeVisible();
  await expect(page.getByText('Page de commencement générique.')).toBeVisible();
  // Page 1
  await page.getByRole('button', { name: 'Commencer' }).click();
  expect(
    page.getByText('I - Questions ouvertes - Titre de la séquence')
  ).toBeVisible();
  await expect(
    page.getByText(
      'Ce module comprend les questions ouvertes. ​ Ceci est une déclaration de type consigne, associée au titre du module.'
    )
  ).toBeVisible();
  //Page 2
  await page.getByRole('button', { name: 'Continuer' }).click();
  //Page 3 : Q1
  //tester avec une valeur supérieur à 100
  await expect(
    page.getByText(
      '➡ 1. Je suis le libellé de la question de type texte de longueur inférieure à 250 caractères'
    )
  ).toBeVisible();
  await expect(
    page.getByText(
      'So close no matter how far couldn’t be much more from the heart forever trust in who we are and nothing else matters <br/> never opened myself this way life is ours, we live it our way all these words I don’t just say and nothing else matters <br/> trust I seek and I find in you every day for us something new open mind for a different view and nothing else matters never cared for what they do never cared for what they know But I know so close no matter how far couldn’t be much more from the heart forever trusting who we are and nothing else matters never cared for what they do never cared for what they know And I know I never opened myself this way life is ours, we live it our way all these words I don’t just say and nothing else matters trust I seek and I find in you every day for us something new open mind for a different view and nothing else matters never cared for what they say never cared for games they play never cared for what they do'
    )
  ).toBeVisible();
  await page
    .getByLabel(
      '➡ 1. Je suis le libellé de la question de type texte de longueur inférieure à 250 caractères'
    )
    .fill('aaaaa');
  expect(
    await page
      .getByLabel(
        '➡ 1. Je suis le libellé de la question de type texte de longueur inférieure à 250 caractères'
      )
      .inputValue()
  ).toEqual('aaaaa');
  expect(
    (
      await page
        .getByLabel(
          '➡ 1. Je suis le libellé de la question de type texte de longueur inférieure à 250 caractères'
        )
        .inputValue()
    ).length
  ).toEqual(5);

  await page.getByRole('button', { name: 'Continuer' }).click();
  //Page 4 :Q2
  await expect(
    page.getByText(
      '➡ 2. Je suis le libellé de la question de type texte de longueur supérieure à 250 caractères. Demain, dès l’aube, à l’heure où blanchit la campagne, Je partirai. Vois-tu, je sais que tu m’attends. J’irai par la forêt, j’irai par la montagne. Je ne puis demeurer loin de toi plus longtemps. Je marcherai les yeux fixés sur mes pensées, Sans rien voir au dehors, sans entendre aucun bruit, Seul, inconnu, le dos courbé, les mains croisées, Triste, et le jour pour moi sera comme la nuit. Je ne regarderai ni l’or du soir qui tombe, Ni les voiles au loin descendant vers Harfleur, Et quand j’arriverai, je mettrai sur ta tombe Un bouquet de houx vert et de bruyère en fleur.'
    )
  ).toBeVisible();
  //tester avec une valeur supérieur à 100
  await page
    .getByLabel(
      '➡ 2. Je suis le libellé de la question de type texte de longueur supérieure à 250 caractères. Demain, dès l’aube, à l’heure où blanchit la campagne, Je partirai. Vois-tu, je sais que tu m’attends. J’irai par la forêt, j’irai par la montagne. Je ne puis demeurer loin de toi plus longtemps. Je marcherai les yeux fixés sur mes pensées, Sans rien voir au dehors, sans entendre aucun bruit, Seul, inconnu, le dos courbé, les mains croisées, Triste, et le jour pour moi sera comme la nuit. Je ne regarderai ni l’or du soir qui tombe, Ni les voiles au loin descendant vers Harfleur, Et quand j’arriverai, je mettrai sur ta tombe Un bouquet de houx vert et de bruyère en fleur.'
    )
    .fill(Array(580).join('x'));
  expect((await page.getByRole('textbox').inputValue()).length).toEqual(500);
  await page
    .getByLabel(
      '➡ 2. Je suis le libellé de la question de type texte de longueur supérieure à 250 caractères.\rDemain, dès l’aube, à l’heure où blanchit la campagne,\rJe partirai. Vois-tu, je sais que tu m’attends. J’irai par la forêt, j’irai par la montagne. Je ne puis demeurer loin de toi plus longtemps.\rJe marcherai les yeux fixés sur mes pensées, Sans rien voir au dehors, sans entendre aucun bruit, Seul, inconnu, le dos courbé, les mains croisées, Triste, et le jour pour moi sera comme la nuit.\rJe ne regarderai ni l’or du soir qui tombe, Ni les voiles au loin descendant vers Harfleur, Et quand j’arriverai, je mettrai sur ta tombe Un bouquet de houx vert et de bruyère en fleur.Le champ de la réponse de type texte long est modifiable à la souris'
    )
    .fill('aaaa');
  expect(
    await page
      .getByLabel(
        '➡ 2. Je suis le libellé de la question de type texte de longueur supérieure à 250 caractères.\rDemain, dès l’aube, à l’heure où blanchit la campagne,\rJe partirai. Vois-tu, je sais que tu m’attends. J’irai par la forêt, j’irai par la montagne. Je ne puis demeurer loin de toi plus longtemps.\rJe marcherai les yeux fixés sur mes pensées, Sans rien voir au dehors, sans entendre aucun bruit, Seul, inconnu, le dos courbé, les mains croisées, Triste, et le jour pour moi sera comme la nuit.\rJe ne regarderai ni l’or du soir qui tombe, Ni les voiles au loin descendant vers Harfleur, Et quand j’arriverai, je mettrai sur ta tombe Un bouquet de houx vert et de bruyère en fleur.Le champ de la réponse de type texte long est modifiable à la souris'
      )
      .inputValue()
  ).toEqual('aaaa');
  await page.getByRole('button', { name: 'Continuer' }).click();
  //Page 5 : Q3
  await expect(
    page.getByText('➡ 3. Numérique entier sans unité - grand (max= 999999999)')
  ).toBeVisible();
  // test avec bonne valeur
  await page
    .getByLabel('➡ 3. Numérique entier sans unité - grand (max= 999999999)')
    .fill('12');
  expect(
    await page
      .getByLabel('➡ 3. Numérique entier sans unité - grand (max= 999999999)')
      .inputValue()
  ).toEqual('12');
  await page.getByRole('button', { name: 'Continuer' }).click();
  //Page 6 : Q4
  await expect(
    page.getByText('➡ 4. Numérique décimal sans unité (entre 0 et 1000.00)')
  ).toBeVisible();
  await expect(
    page.getByText('Controle par rapport à question 3 dont la valeur est :12')
  ).toBeVisible();
  await page
    .getByLabel('➡ 4. Numérique décimal sans unité (entre 0 et 1000.00)')
    .fill('8');
  expect(
    await page
      .getByLabel('➡ 4. Numérique décimal sans unité (entre 0 et 1000.00)')
      .inputValue()
  ).toEqual('8');
  await page.getByRole('button', { name: 'Continuer' }).click();
  //Page 7 : Q5
  await expect(
    page.getByText(
      '➡ 5. Numérique max 9999 avec unité et infobulle sur le mot unité de cette question'
    )
  ).toBeVisible();
  await page
    .getByLabel(
      '➡ 5. Numérique max 9999 avec unité et infobulle sur le mot unité de cette question'
    )
    .fill('5');
  expect(
    await page
      .getByLabel(
        '➡ 5. Numérique max 9999 avec unité et infobulle sur le mot unité de cette question'
      )
      .inputValue()
  ).toEqual('5');
  await expect(page.getByText('k€', { exact: true })).toBeVisible();

  const uniteElement = await page.$('span.field-md');
  if (uniteElement) {
    await uniteElement.hover();
  } else {
    console.error('Unable to find uniteElement');
  }
  await expect(
    page.getByText(
      'l’unité choisie ici est le kilo euro mais je peux tester une infobulle un peu longue pour regarder'
    )
  ).toBeVisible();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(page.getByText('Autres formats de réponse')).toBeVisible();
  expect(
    page.getByText(
      'Ce sous module comprend des questions de type : - date - durée - booléen'
    )
  );
  //Page 8
  await page.getByRole('button', { name: 'Continuer' }).click();
  //Page 9 : Q6
  await expect(page.getByText('➡ 6. Date jour')).toBeVisible();
  //test avec mauvaise valeur

  await page.getByLabel('➡ 6. Date jour').fill('2020-05-01');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText(
        'La date saisie doit être comprise entre 2000-01-01 et 2020-03-31.'
      )
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await page.getByLabel('➡ 6. Date jour').fill('2004-05-01');

  await page.getByRole('button', { name: 'Continuer' }).click();
  // Page 9 : Q7
  expect(page.getByText('➡ 7. Booléen'));
  await page.getByLabel('➡ 7. Booléen').check();
  expect(page.getByLabel('➡ 7. Booléen').isChecked()).toBeTruthy();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page.getByText(
      'II - Questions à choix unique et questions à choix multiple'
    )
  ).toBeVisible();
  // Page 10
  await page.getByRole('button', { name: 'Continuer' }).click();
  // Page 11 : Q8
  await expect(page.getByRole('button', { name: 'Continuer' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Retour' })).toBeVisible();
  await expect(
    page.getByText('➡ 8. Question à choix unique / présentation bouton radio')
  ).toBeVisible();
  await expect(
    page.getByText('code1 : le libellé du code 1 contient du gras')
  ).toBeVisible();
  await expect(
    page.getByRole('radio', {
      name: 'code1 : le libellé du code 1 contient du gras',
    })
  ).toBeVisible();
  await expect(
    page.getByText('code2 le libellé du code 2 contient de l’italique')
  ).toBeVisible();
  await expect(
    page.getByRole('radio', {
      name: 'code2 le libellé du code 2 contient de l’italique',
    })
  ).toBeVisible();
  await expect(
    page.getByText(
      'code3 : le libellé du code 3 contient du gras et de l’italique'
    )
  ).toBeVisible();
  await expect(
    page.getByRole('radio', {
      name: 'code3 : le libellé du code 3 contient du gras et de l’italique',
    })
  ).toBeVisible();
  await expect(
    page.getByText('code4 : le libellé du code 4 contient du gras italique')
  ).toBeVisible();
  await expect(
    page.getByRole('radio', {
      name: 'code4 : le libellé du code 4 contient du gras italique',
    })
  ).toBeVisible();
  await expect(
    page.getByText(
      'code5 : le libellé du code 5 contient des retours à la ligne ligne 2 ligne 3'
    )
  ).toBeVisible();
  await expect(
    page.getByRole('radio', {
      name: 'code5 : le libellé du code 5 contient des retours à la ligne ligne 2 ligne 3',
    })
  ).toBeVisible();
  await expect(page.getByText('code6')).toBeVisible();
  await expect(
    page.getByRole('radio', {
      name: 'code6',
    })
  ).toBeVisible();
  await expect(
    page.getByText('code7 le code 7 porte une infobulle')
  ).toBeVisible();
  await expect(
    page.getByRole('radio', {
      name: 'code7 le code 7 porte une infobulle',
    })
  ).toBeVisible();
  await expect(page.getByText('code8')).toBeVisible();
  await expect(
    page.getByRole('radio', {
      name: 'code8',
    })
  ).toBeVisible();
  const code7 = await page.$('span.field-md');
  await code7.hover();
  expect(page.getByText('My name is Bond, James Bond')).toBeVisible();
  const radioBtn8 = await page.$('#lunatic-radio-jfjepz6i-6');
  await radioBtn8.check();
  expect(radioBtn8.isChecked()).toBeTruthy();
  await page.getByRole('button', { name: 'Continuer' }).click();
  //PAGE 12 : Q9
  await expect(page.getByRole('button', { name: 'Continuer' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Retour' })).toBeVisible();
  await expect(
    page.getByText(
      '➡ 9. Question à choix unique - présentation case à cocher décochable'
    )
  ).toBeVisible();
  await expect(
    page.getByText('code1 : le libellé du code 1 contient du gras')
  ).toBeVisible();
  await expect(
    page.getByRole('radio', {
      name: 'code1 : le libellé du code 1 contient du gras',
    })
  ).toBeVisible();
  await expect(
    page.getByText('code2 le libellé du code 2 contient de l’italique')
  ).toBeVisible();
  await expect(
    page.getByRole('radio', {
      name: 'code2 le libellé du code 2 contient de l’italique',
    })
  ).toBeVisible();
  await expect(
    page.getByText(
      'code3 : le libellé du code 3 contient du gras et de l’italique'
    )
  ).toBeVisible();
  await expect(
    page.getByRole('radio', {
      name: 'code3 : le libellé du code 3 contient du gras et de l’italique',
    })
  ).toBeVisible();
  await expect(
    page.getByText('code4 : le libellé du code 4 contient du gras italique')
  ).toBeVisible();
  await expect(
    page.getByRole('radio', {
      name: 'code4 : le libellé du code 4 contient du gras italique',
    })
  ).toBeVisible();
  await expect(
    page.getByText(
      'code5 : le libellé du code 5 contient des retours à la ligne ligne 2 ligne 3'
    )
  ).toBeVisible();
  await expect(
    page.getByRole('radio', {
      name: 'code5 : le libellé du code 5 contient des retours à la ligne ligne 2 ligne 3',
    })
  ).toBeVisible();
  await expect(page.getByText('code6')).toBeVisible();
  await expect(
    page.getByRole('radio', {
      name: 'code6',
    })
  ).toBeVisible();
  await expect(
    page.getByText('code7 le code 7 porte une infobulle')
  ).toBeVisible();
  await expect(
    page.getByRole('radio', {
      name: 'code7 le code 7 porte une infobulle',
    })
  ).toBeVisible();
  await expect(page.getByText('code8')).toBeVisible();
  await expect(
    page.getByRole('radio', {
      name: 'code8',
    })
  ).toBeVisible();
  const thirdRadio = page.getByRole('radio', {
    name: 'code3 : le libellé du code 3 contient du gras et de l’italique',
  });
  await page
    .getByRole('radio', {
      name: 'code1 : le libellé du code 1 contient du gras',
    })
    .click();
  await page
    .getByRole('radio', {
      name: 'code1 : le libellé du code 1 contient du gras',
    })
    .press('ArrowDown');
  await page
    .getByRole('radio', {
      name: 'code2 le libellé du code 2 contient de l’italique',
    })
    .press('ArrowDown');
  await thirdRadio.press('Enter');
  expect(thirdRadio.isChecked()).toBeTruthy();
  const fifthRadio = await page.getByRole('radio', {
    name: 'code5 : le libellé du code 5 contient des retours à la ligne ligne 2 ligne 3',
  });
  await fifthRadio.click();
  expect(fifthRadio.isChecked()).toBeTruthy();
  expect(await thirdRadio.isChecked()).toBeFalsy();
  await page.getByRole('button', { name: 'Continuer' }).click();
  //PAGE 13 : Q10
  expect(page.getByRole('button', { name: 'Continuer' })).toBeVisible();
  expect(page.getByRole('button', { name: 'Retour' })).toBeVisible();
  await expect(
    page.getByText(
      '➡ 10. Question à choix unique - présentation images - non fonc Lunatic (Symboles en attendant) - besoin Conjoncture'
    )
  ).toBeVisible();
  await expect(page.getByText('soleil')).toBeVisible();
  await expect(page.getByRole('radio', { name: 'soleil' })).toBeVisible();
  await expect(page.getByText('➘')).toBeVisible();
  await expect(page.getByRole('radio', { name: '➘' })).toBeVisible();
  await expect(page.getByText('➞')).toBeVisible();
  await expect(page.getByRole('radio', { name: '➞' })).toBeVisible();
  await expect(page.getByText('orage')).toBeVisible();
  await expect(page.getByRole('radio', { name: 'orage' })).toBeVisible();
  const fourthRadio = await page.$('#lunatic-radio-k6cc6f8r-4');
  await fourthRadio.check();
  expect(fourthRadio.isChecked()).toBeTruthy();
  await page.getByRole('button', { name: 'Continuer' }).click();
  //Page 14 : Q11
  await expect(page.getByRole('button', { name: 'Continuer' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Retour' })).toBeVisible();
  await expect(
    page.getByText(
      '➡ 11. Question à choix unique - présentation liste déroulante'
    )
  ).toBeVisible();
  await expect(
    page
      .getByRole('combobox', {
        name: '➡ 11. Question à choix unique - présentation liste déroulante',
      })
      .locator('div')
  ).toBeVisible();
  const dropdown = await page.$('#jfjfae9f');
  await dropdown.click();

  // sélectionner l'option "Allier" et cliquer dessus pour la choisir
  const option = await page.$('text=Allier');
  await option.click();

  // vérifier que l'option sélectionnée a bien le texte "Allier"
  const selectedOption = await dropdown.$('.lunatic-combo-box-selected');
  const selectedOptionText = await selectedOption.textContent();
  expect(selectedOptionText.trim()).toEqual('Allier');
  await dropdown.click();
  const option2 = await page.$('text=Drôme');
  await option2.click();
  const selectedOptionText2 = await selectedOption.textContent();
  expect(selectedOptionText2.trim()).toEqual('Drôme');
  await page.getByRole('button', { name: 'Continuer' }).click();
  //PAGE 14 : Q12
  expect(page.getByRole('button', { name: 'Continuer' })).toBeVisible();
  expect(page.getByRole('button', { name: 'Retour' })).toBeVisible();
  //TODO AUTOCOMLETION
  expect(
    page.getByText(
      '➡ 12. Question à choix unique - présentation autocomplétion, par TS'
    )
  ).toBeVisible();

  await page
    .getByLabel(
      '➡ 12. Question à choix unique - présentation autocomplétion, par TS'
    )
    .fill('ok');
  await page.getByRole('button', { name: 'Continuer' }).click();
  //PAGE 15 : Q13
  await expect(page.getByRole('button', { name: 'Continuer' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Retour' })).toBeVisible();
  await expect(
    page.getByText('➡ 13. Question à choix multiple - réponse booléen')
  ).toBeVisible();
  await expect(
    page.getByText('code1 : le libellé du code 1 contient du gras')
  ).toBeVisible();
  await expect(
    page.getByRole('checkbox', {
      name: 'code1 : le libellé du code 1 contient du gras',
    })
  ).toBeVisible();
  await expect(
    page.getByText('code2 le libellé du code 2 contient de l’italique')
  ).toBeVisible();
  await expect(
    page.getByRole('checkbox', {
      name: 'code2 le libellé du code 2 contient de l’italique',
    })
  ).toBeVisible();
  await expect(
    page.getByText(
      'code3 : le libellé du code 3 contient du gras et de l’italique'
    )
  ).toBeVisible();
  await expect(
    page.getByRole('checkbox', {
      name: 'code3 : le libellé du code 3 contient du gras et de l’italique',
    })
  ).toBeVisible();
  await expect(
    page.getByText('code4 : le libellé du code 4 contient du gras italique')
  ).toBeVisible();
  await expect(
    page.getByRole('checkbox', {
      name: 'code4 : le libellé du code 4 contient du gras italique',
    })
  ).toBeVisible();
  await expect(
    page.getByText(
      'code5 : le libellé du code 5 contient des retours à la ligne ligne 2 ligne 3'
    )
  ).toBeVisible();
  await expect(
    page.getByRole('checkbox', {
      name: 'code5 : le libellé du code 5 contient des retours à la ligne ligne 2 ligne 3',
    })
  ).toBeVisible();
  await expect(page.getByText('code6')).toBeVisible();
  await expect(
    page.getByRole('checkbox', {
      name: 'code6',
    })
  ).toBeVisible();
  await expect(
    page.getByText('code7 le code 7 porte une infobulle')
  ).toBeVisible();
  await expect(
    page.getByRole('checkbox', {
      name: 'code7 le code 7 porte une infobulle',
    })
  ).toBeVisible();
  await expect(page.getByText('code8')).toBeVisible();
  await expect(
    page.getByRole('checkbox', {
      name: 'code8',
    })
  ).toBeVisible();
  const radioBtnQ13_1 = await page.$('#lunatic-checkbox-jfkxh2lf-QCM_B1');
  const radioBtnQ13_5 = await page.$('#lunatic-checkbox-jfkxh2lf-QCM_B5');
  await radioBtnQ13_1.check();
  await radioBtnQ13_5.check();
  expect(await radioBtnQ13_1.isChecked()).toBeTruthy();
  expect(await radioBtnQ13_5.isChecked()).toBeTruthy();
  await page.getByRole('button', { name: 'Continuer' }).click();
  //PAGE 16 : Q14
  await expect(page.getByRole('button', { name: 'Continuer' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Retour' })).toBeVisible();
  await expect(
    page.getByText(
      '➡ 14. Question à choix multiple - réponse oui/non case à cocher'
    )
  ).toBeVisible();
  await expect(page.getByRole('cell', { name: 'choix 1' })).toBeVisible();
  await expect(
    page
      .getByRole('row', { name: 'choix 1' })
      .getByText('OuiNonNe sait pasSans objet')
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', { name: 'choix 1' })
      .getByRole('radio', { name: 'Oui' })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', { name: 'choix 1' })
      .getByRole('radio', { name: 'Non' })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', { name: 'choix 1' })
      .getByRole('radio', { name: 'Ne sait pas' })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', { name: 'choix 1' })
      .getByRole('radio', { name: 'Sans Objet' })
  ).toBeVisible();
  await expect(page.getByRole('cell', { name: 'choix 2' })).toBeVisible();
  await expect(
    page
      .getByRole('row', { name: 'choix 2' })
      .getByText('OuiNonNe sait pasSans objet')
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', { name: 'choix 2' })
      .getByRole('radio', { name: 'Oui' })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', { name: 'choix 2' })
      .getByRole('radio', { name: 'Non' })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', { name: 'choix 2' })
      .getByRole('radio', { name: 'Ne sait pas' })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', { name: 'choix 2' })
      .getByRole('radio', { name: 'Sans Objet' })
  ).toBeVisible();
  await expect(page.getByRole('cell', { name: 'choix 3' })).toBeVisible();
  await expect(
    page
      .getByRole('row', { name: 'choix 3' })
      .getByText('OuiNonNe sait pasSans objet')
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', { name: 'choix 3' })
      .getByRole('radio', { name: 'Oui' })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', { name: 'choix 3' })
      .getByRole('radio', { name: 'Non' })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', { name: 'choix 3' })
      .getByRole('radio', { name: 'Ne sait pas' })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', { name: 'choix 3' })
      .getByRole('radio', { name: 'Sans Objet' })
  ).toBeVisible();
  await expect(page.getByRole('cell', { name: 'choix 4' })).toBeVisible();
  await expect(
    page
      .getByRole('row', { name: 'choix 4' })
      .getByText('OuiNonNe sait pasSans objet')
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', { name: 'choix 4' })
      .getByRole('radio', { name: 'Oui' })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', { name: 'choix 4' })
      .getByRole('radio', { name: 'Non' })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', { name: 'choix 4' })
      .getByRole('radio', { name: 'Ne sait pas' })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', { name: 'choix 4' })
      .getByRole('radio', { name: 'Sans Objet' })
  ).toBeVisible();
  await expect(page.getByRole('cell', { name: 'choix 5' })).toBeVisible();
  await expect(
    page
      .getByRole('row', { name: 'choix 5' })
      .getByText('OuiNonNe sait pasSans objet')
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', { name: 'choix 5' })
      .getByRole('radio', { name: 'Oui' })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', { name: 'choix 5' })
      .getByRole('radio', { name: 'Non' })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', { name: 'choix 5' })
      .getByRole('radio', { name: 'Ne sait pas' })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', { name: 'choix 5' })
      .getByRole('radio', { name: 'Sans Objet' })
  ).toBeVisible();
  const radioNesaisPasL1 = page
    .getByRole('row', { name: 'choix 1' })
    .getByRole('radio', { name: 'Ne sait pas' });
  await radioNesaisPasL1.check();
  expect(await radioNesaisPasL1.isChecked()).toBeTruthy();
  await page.getByRole('button', { name: 'Continuer' }).click();
  //PAGE 17 : Q15
  await expect(page.getByRole('button', { name: 'Continuer' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Retour' })).toBeVisible();
  await expect(
    page.getByText('➡ 15. Question à choix multiple - réponse oui/non radio')
  ).toBeVisible();
  await expect(
    page.getByRole('cell', {
      name: 'code1 : le libellé du code 1 contient du gras',
    })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', {
        name: 'code1 : le libellé du code 1 contient du gras',
      })
      .getByRole('radio', { name: 'Oui' })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', {
        name: 'code1 : le libellé du code 1 contient du gras',
      })
      .getByRole('radio', { name: 'Non' })
  ).toBeVisible();
  await expect(
    page.getByRole('cell', {
      name: 'code2 le libellé du code 2 contient de l’italique',
    })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', {
        name: 'code2 le libellé du code 2 contient de l’italique',
      })
      .getByRole('radio', { name: 'Oui' })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', {
        name: 'code2 le libellé du code 2 contient de l’italique',
      })
      .getByRole('radio', { name: 'Non' })
  ).toBeVisible();
  await expect(
    page.getByRole('cell', {
      name: 'code3 : le libellé du code 3 contient du gras et de l’italique',
    })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', {
        name: 'code3 : le libellé du code 3 contient du gras et de l’italique',
      })
      .getByRole('radio', { name: 'Oui' })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', {
        name: 'code3 : le libellé du code 3 contient du gras et de l’italique',
      })
      .getByRole('radio', { name: 'Non' })
  ).toBeVisible();
  await expect(
    page.getByRole('cell', {
      name: 'code4 : le libellé du code 4 contient du gras italique',
    })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', {
        name: 'code4 : le libellé du code 4 contient du gras italique',
      })
      .getByRole('radio', { name: 'Oui' })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', {
        name: 'code4 : le libellé du code 4 contient du gras italique',
      })
      .getByRole('radio', { name: 'Non' })
  ).toBeVisible();
  await expect(
    page.getByRole('cell', {
      name: 'code5 : le libellé du code 5 contient des retours à la ligne ligne 2 ligne 3',
    })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', {
        name: 'code5 : le libellé du code 5 contient des retours à la ligne ligne 2 ligne 3',
      })
      .getByRole('radio', { name: 'Oui' })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', {
        name: 'code5 : le libellé du code 5 contient des retours à la ligne ligne 2 ligne 3',
      })
      .getByRole('radio', { name: 'Non' })
  ).toBeVisible();
  await expect(page.getByRole('cell', { name: 'code6' })).toBeVisible();
  await expect(
    page
      .getByRole('row', {
        name: 'code6',
      })
      .getByRole('radio', { name: 'Oui' })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', {
        name: 'code6',
      })
      .getByRole('radio', { name: 'Non' })
  ).toBeVisible();
  await expect(
    page.getByRole('cell', { name: 'code7 le code 7 porte une infobulle' })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', {
        name: 'code7 le code 7 porte une infobulle',
      })
      .getByRole('radio', { name: 'Oui' })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', {
        name: 'code7 le code 7 porte une infobulle',
      })
      .getByRole('radio', { name: 'Non' })
  ).toBeVisible();
  await expect(page.getByRole('cell', { name: 'code8' })).toBeVisible();
  await expect(
    page
      .getByRole('row', {
        name: 'code8',
      })
      .getByRole('radio', { name: 'Oui' })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', {
        name: 'code8',
      })
      .getByRole('radio', { name: 'Non' })
  ).toBeVisible();

  const radioBtnQ15_1 = page
    .getByRole('row', { name: 'code1 : le libellé du code 1 contient du gras' })
    .getByRole('radio', { name: 'Oui' });
  await radioBtnQ15_1.check();
  expect(await radioBtnQ15_1.isChecked()).toBeTruthy();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(page.getByRole('button', { name: 'Continuer' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Retour' })).toBeVisible();
  await expect(page.getByText('III - Tableaux')).toBeVisible();
  await expect(page.getByText('Ce module concerne les tableaux')).toBeVisible();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(page.getByRole('button', { name: 'Continuer' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Retour' })).toBeVisible();
  await expect(
    page.getByText(
      '➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGER'
    )
  ).toBeVisible();
  await expect(
    page.getByRole('cell', { name: 'Nombre de personnes, entre 0 et 20' })
  ).toBeVisible();
  await expect(page.getByRole('cell', { name: 'moins de 15' })).toBeVisible();
  await expect(
    page
      .getByRole('row', {
        name: 'moins de 15 ➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGER Rappel de la valeur collectée INTEGER = 12',
      })
      .getByLabel(
        '➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGERRappel de la valeur collectée INTEGER = 12'
      )
  ).toBeVisible();
  await expect(
    page.getByRole('cell', { name: 'de 16 à 17 ans' })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', {
        name: 'de 16 à 17 ans ➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGER Rappel de la valeur collectée INTEGER = 12',
      })
      .getByRole('textbox', {
        name: '➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGER Rappel de la valeur collectée INTEGER = 12',
      })
  ).toBeVisible();
  await expect(
    page.getByRole('cell', { name: 'de 18 à 19 ans' })
  ).toBeVisible();
  await expect(
    page
      .getByRole('row', {
        name: 'de 18 à 19 ans ➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGER Rappel de la valeur collectée INTEGER = 12',
      })
      .getByRole('textbox', {
        name: '➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGER Rappel de la valeur collectée INTEGER = 12',
      })
  ).toBeVisible();
  await expect(page.getByRole('cell', { name: '20 et plus' })).toBeVisible();
  await expect(
    page
      .getByRole('row', {
        name: '20 et plus ➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGER Rappel de la valeur collectée INTEGER = 12',
      })
      .getByRole('textbox', {
        name: '➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGER Rappel de la valeur collectée INTEGER = 12',
      })
  ).toBeVisible();
  await page
    .getByRole('row', {
      name: 'moins de 15 ➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGER Rappel de la valeur collectée INTEGER = 12',
    })
    .getByLabel(
      '➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGERRappel de la valeur collectée INTEGER = 12'
    )
    .fill('3');
  await page
    .getByRole('row', {
      name: 'moins de 15 ➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGER Rappel de la valeur collectée INTEGER = 12',
    })
    .getByLabel(
      '➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGERRappel de la valeur collectée INTEGER = 12'
    )
    .fill('3');
  await page
    .getByRole('row', {
      name: 'de 16 à 17 ans ➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGER Rappel de la valeur collectée INTEGER = 12',
    })
    .getByRole('textbox', {
      name: '➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGER Rappel de la valeur collectée INTEGER = 12',
    })
    .fill('4');
  await page
    .getByRole('row', {
      name: 'de 18 à 19 ans ➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGER Rappel de la valeur collectée INTEGER = 12',
    })
    .getByRole('textbox', {
      name: '➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGER Rappel de la valeur collectée INTEGER = 12',
    })
    .fill('5');

  await page
    .getByRole('row', {
      name: '20 et plus ➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGER Rappel de la valeur collectée INTEGER = 12',
    })
    .getByRole('textbox', {
      name: '➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGER Rappel de la valeur collectée INTEGER = 12',
    })
    .fill('6');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('La somme est supérieure au nombre collecté : 12')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await page
    .getByRole('row', {
      name: '20 et plus ➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGER Rappel de la valeur collectée INTEGER = 12',
    })
    .getByRole('textbox', {
      name: '➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGER Rappel de la valeur collectée INTEGER = 12',
    })
    .fill('2');

  await page
    .getByRole('row', {
      name: 'de 18 à 19 ans ➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGER Rappel de la valeur collectée INTEGER = 12',
    })
    .getByRole('textbox', {
      name: '➡ 16. Tableau TIC - répartition du nb habitants, comparaison question INTEGER Rappel de la valeur collectée INTEGER = 12',
    })
    .fill('1');
  await page.getByRole('button', { name: 'Continuer' }).click();
  //Q17
  await expect(page.getByRole('button', { name: 'Continuer' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Retour' })).toBeVisible();
  await expect(
    page.getByText('➡ 17. Tableau un axe simple, une mesure, sans unité')
  ).toBeVisible();
  await expect(
    page.getByRole('cell', { name: 'Mesure de type numérique' })
  ).toBeVisible();
  await expect(page.getByRole('cell', { name: 'choix 1' })).toBeVisible();
  await expect(
    page
      .getByRole('row', {
        name: 'choix 1 ➡ 17. Tableau un axe simple, une mesure, sans unité COntrole sur somme des lignes > 100',
      })
      .getByLabel(
        '➡ 17. Tableau un axe simple, une mesure, sans unitéCOntrole sur somme des lignes > 100'
      )
  ).toBeVisible();
  await expect(page.getByRole('cell', { name: 'choix 2' })).toBeVisible();
  await expect(
    page
      .getByRole('row', {
        name: 'choix 2 ➡ 17. Tableau un axe simple, une mesure, sans unité COntrole sur somme des lignes > 100',
      })
      .getByRole('textbox', {
        name: '➡ 17. Tableau un axe simple, une mesure, sans unité COntrole sur somme des lignes > 100',
      })
  ).toBeVisible();
  await expect(page.getByRole('cell', { name: 'choix 3' })).toBeVisible();
  await expect(
    page
      .getByRole('row', {
        name: 'choix 3 ➡ 17. Tableau un axe simple, une mesure, sans unité COntrole sur somme des lignes > 100',
      })
      .getByRole('textbox', {
        name: '➡ 17. Tableau un axe simple, une mesure, sans unité COntrole sur somme des lignes > 100',
      })
  ).toBeVisible();
  await expect(page.getByRole('cell', { name: 'choix 4' })).toBeVisible();
  await expect(
    page
      .getByRole('row', {
        name: 'choix 4 ➡ 17. Tableau un axe simple, une mesure, sans unité COntrole sur somme des lignes > 100',
      })
      .getByRole('textbox', {
        name: '➡ 17. Tableau un axe simple, une mesure, sans unité COntrole sur somme des lignes > 100',
      })
  ).toBeVisible();
  await expect(page.getByRole('cell', { name: 'choix 5' })).toBeVisible();
  await expect(
    page
      .getByRole('row', {
        name: 'choix 5 ➡ 17. Tableau un axe simple, une mesure, sans unité COntrole sur somme des lignes > 100',
      })
      .getByRole('textbox', {
        name: '➡ 17. Tableau un axe simple, une mesure, sans unité COntrole sur somme des lignes > 100',
      })
  ).toBeVisible();

  await page
    .getByRole('row', {
      name: 'choix 1 ➡ 17. Tableau un axe simple, une mesure, sans unité COntrole sur somme des lignes > 100',
    })
    .getByLabel(
      '➡ 17. Tableau un axe simple, une mesure, sans unitéCOntrole sur somme des lignes > 100'
    )
    .fill('12');
  expect(
    await page
      .getByRole('row', {
        name: 'choix 1 ➡ 17. Tableau un axe simple, une mesure, sans unité COntrole sur somme des lignes > 100',
      })
      .getByLabel(
        '➡ 17. Tableau un axe simple, une mesure, sans unitéCOntrole sur somme des lignes > 100'
      )
      .inputValue()
  ).toEqual('12');
  await page.getByRole('button', { name: 'Continuer' }).click();
  //Q18
  await page
    .locator('#lunatic-table-td-jfkzpexn-0-1')
    .getByLabel('➡ 18. Tableau un axe simple, plusieurs mesures, sans unité')
    .fill('1');
  expect(
    await page
      .locator('#lunatic-table-td-jfkzpexn-0-1')
      .getByLabel('➡ 18. Tableau un axe simple, plusieurs mesures, sans unité')
      .inputValue()
  ).toEqual('1');
  await page
    .getByRole('row', {
      name: 'choix 1 ➡ 18. Tableau un axe simple, plusieurs mesures, sans unité',
    })
    .getByRole('radio', { name: 'Oui' })
    .click();
  await page
    .getByRole('row', {
      name: 'choix 1 ➡ 18. Tableau un axe simple, plusieurs mesures, sans unité',
    })
    .getByRole('radio', { name: 'Oui' })
    .click();
  await page
    .getByRole('row', {
      name: 'choix 1 ➡ 18. Tableau un axe simple, plusieurs mesures, sans unité',
    })
    .getByRole('radio', { name: 'Oui' })
    .click();
  await page
    .getByRole('row', { name: 'choix 3' })
    .getByRole('radio', { name: 'Oui' })
    .click();
  expect(
    await page
      .getByRole('row', { name: 'choix 3' })
      .getByRole('radio', { name: 'Oui' })
      .isChecked()
  ).toBeTruthy();
  await page
    .getByRole('row', {
      name: 'choix 5 ➡ 18. Tableau un axe simple, plusieurs mesures, sans unité',
    })
    .getByRole('radio', { name: 'Oui' })
    .click();

  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page.getByText(
      '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité'
    )
  ).toBeVisible();
  await page
    .locator('#lunatic-table-td-jfkzttm3-0-1')
    .getByLabel('➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité')
    .fill('1');

  await page
    .locator('#lunatic-table-td-jfkzttm3-1-1')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('12');

  await page
    .locator('#lunatic-table-td-jfkzttm3-2-1')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('13');

  await page
    .locator('#lunatic-table-td-jfkzttm3-3-1')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('14');

  await page
    .locator('#lunatic-table-td-jfkzttm3-4-1')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('15');

  await page
    .locator('#lunatic-table-td-jfkzttm3-5-1')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('16');

  await page
    .locator('#lunatic-table-td-jfkzttm3-6-1')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('17');

  await page
    .locator('#lunatic-table-td-jfkzttm3-7-1')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('18');

  await page.locator('#lunatic-table-td-jfkzttm3-1-2 #jfkzttm3').fill('21');

  await page
    .locator('#lunatic-table-td-jfkzttm3-0-2')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('22');

  await page
    .locator('#lunatic-table-td-jfkzttm3-1-2')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('23');

  await page
    .locator('#lunatic-table-td-jfkzttm3-2-2')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('24');

  await page
    .locator('#lunatic-table-td-jfkzttm3-3-2')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('25');

  await page
    .locator('#lunatic-table-td-jfkzttm3-4-2')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('26');
  await page
    .locator('#lunatic-table-td-jfkzttm3-5-2')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('27');
  await page
    .locator('#lunatic-table-td-jfkzttm3-6-2')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('28');
  await page
    .locator('#lunatic-table-td-jfkzttm3-7-2')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('29');

  await page
    .locator('#lunatic-table-td-jfkzttm3-5-2')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('27');

  await page
    .locator('#lunatic-table-td-jfkzttm3-0-3')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('3');
  await page
    .locator('#lunatic-table-td-jfkzttm3-1-3')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('3');

  await page
    .locator('#lunatic-table-td-jfkzttm3-2-3')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('31');

  await page
    .locator('#lunatic-table-td-jfkzttm3-3-3')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('32');

  await page
    .locator('#lunatic-table-td-jfkzttm3-4-3')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('33');

  await page
    .locator('#lunatic-table-td-jfkzttm3-5-3')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('34');

  await page
    .locator('#lunatic-table-td-jfkzttm3-6-3')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('35');

  await page
    .locator('#lunatic-table-td-jfkzttm3-7-3')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('36');

  await page
    .locator('#lunatic-table-td-jfkzttm3-0-4')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('4');

  await page
    .locator('#lunatic-table-td-jfkzttm3-1-4')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('41');

  await page
    .locator('#lunatic-table-td-jfkzttm3-2-4')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('42');

  await page
    .locator('#lunatic-table-td-jfkzttm3-3-4')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('43');

  await page
    .locator('#lunatic-table-td-jfkzttm3-4-4')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('44');

  await page
    .locator('#lunatic-table-td-jfkzttm3-5-4')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('45');

  await page
    .locator('#lunatic-table-td-jfkzttm3-6-4')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('46');

  await page
    .locator('#lunatic-table-td-jfkzttm3-7-4')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('47');

  await page
    .locator('#lunatic-table-td-jfkzttm3-0-5')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('5');

  await page
    .locator('#lunatic-table-td-jfkzttm3-1-5')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('51');

  await page
    .locator('#lunatic-table-td-jfkzttm3-2-5')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('52');

  await page
    .locator('#lunatic-table-td-jfkzttm3-3-5')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('53');

  await page
    .locator('#lunatic-table-td-jfkzttm3-4-5')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('54');

  await page
    .locator('#lunatic-table-td-jfkzttm3-5-5')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('55');

  await page
    .locator('#lunatic-table-td-jfkzttm3-6-5')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('56');

  await page
    .locator('#lunatic-table-td-jfkzttm3-7-5')
    .getByRole('textbox', {
      name: '➡ 19. Tableau 2 axes - 1 mesure de type numérique, sans unité',
    })
    .fill('57');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page
    .getByRole('row', {
      name: 'code1 code 1 1 ➡ 20. Tableau 1 axe avec hiérarchie , 1 mesure, avec unité k€',
    })
    .getByLabel('➡ 20. Tableau 1 axe avec hiérarchie , 1 mesure, avec unité')
    .fill('11');

  await page
    .getByRole('row', {
      name: 'code 1 2 ➡ 20. Tableau 1 axe avec hiérarchie , 1 mesure, avec unité k€',
    })
    .getByRole('textbox', {
      name: '➡ 20. Tableau 1 axe avec hiérarchie , 1 mesure, avec unité',
    })
    .fill('12');

  await page
    .getByRole('row', {
      name: 'code2 code 2 1 ➡ 20. Tableau 1 axe avec hiérarchie , 1 mesure, avec unité k€',
    })
    .getByRole('textbox', {
      name: '➡ 20. Tableau 1 axe avec hiérarchie , 1 mesure, avec unité',
    })
    .fill('21');

  await page
    .getByRole('row', {
      name: 'code 2 2 ➡ 20. Tableau 1 axe avec hiérarchie , 1 mesure, avec unité k€',
    })
    .getByRole('textbox', {
      name: '➡ 20. Tableau 1 axe avec hiérarchie , 1 mesure, avec unité',
    })
    .fill('22');
  await page
    .getByRole('row', {
      name: 'code 2 3 ➡ 20. Tableau 1 axe avec hiérarchie , 1 mesure, avec unité k€',
    })
    .getByRole('textbox', {
      name: '➡ 20. Tableau 1 axe avec hiérarchie , 1 mesure, avec unité',
    })
    .fill('23');
  await page
    .getByRole('row', {
      name: 'code 3 ➡ 20. Tableau 1 axe avec hiérarchie , 1 mesure, avec unité k€',
    })
    .getByRole('textbox', {
      name: '➡ 20. Tableau 1 axe avec hiérarchie , 1 mesure, avec unité',
    })
    .fill('30');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page
    .getByLabel(
      '➡ 21. Tableau dynamique jusque 5 lignes, 2 mesures dont une unité A CREER'
    )
    .fill('11');
  await page.locator('#main').click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page
    .getByLabel('➡ 22. Quel est votre prénom ?Controle sur prénom vide')
    .click();
  await page
    .getByLabel('➡ 22. Quel est votre prénom ?Controle sur prénom vide')
    .press('CapsLock');
  await page
    .getByLabel('➡ 22. Quel est votre prénom ?Controle sur prénom vide')
    .fill('AAAAA');
  await page
    .getByLabel('➡ 22. Quel est votre prénom ?Controle sur prénom vide')
    .press('CapsLock');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByLabel('➡ 23. Quelle est votre adresse email ?').click();
  await page
    .getByLabel('➡ 23. Quelle est votre adresse email ?')
    .fill('a@gmail.com');
  await page.getByRole('button', { name: 'Continuer' }).click();
  expect(page.getByText('Description socio démo de AAAAA')).toBeVisible();
  await page.getByRole('button', { name: 'Continuer' }).click();
  //oui
  expect(
    page.getByText('➡ 24. Bonjour AAAAA, êtes vous majeur ?')
  ).toBeVisible();
  await page.getByRole('radio', { name: 'Oui' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  expect(
    page.getByText('➡ 25. AAAAA, quelle est votre date de naissance ?')
  ).toBeVisible();
  await page.locator('#main').click();
  await page
    .getByLabel(
      '➡ 25. AAAAA, quelle est votre date de naissance ?Format année : AAAAControle sur age et fait d’être majeurAGE calculé : null'
    )
    .fill('2000-03-19');
  await page.locator('#main').click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  //cas homme
  await page.getByRole('radio', { name: 'Homme' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page
    .getByLabel(
      '➡ 27. Question masquée par défaut, qui s’affiche lorsque l’individu coche majeurSi a coché Homme, la question 33 disparaitra'
    )
    .click();
  await page
    .getByLabel(
      '➡ 27. Question masquée par défaut, qui s’affiche lorsque l’individu coche majeurSi a coché Homme, la question 33 disparaitra'
    )
    .fill("ok c'est noté");
  await page.getByRole('button', { name: 'Continuer' }).click();
  //cas femme
  await page.getByRole('button', { name: 'Retour' }).click();
  await page.getByRole('button', { name: 'Retour' }).click();
  await page.getByRole('radio', { name: 'Femme' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  expect(
    page.getByText(
      '➡ 28. Question affichée par défaut, filtrée si l’individu est un homme'
    )
  ).toBeVisible();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(page.getByRole('button', { name: 'Continuer' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Retour' })).toBeVisible();
  expect(
    page.getByText('V - PERSO - Composition du ménage - boucle type logement')
  );
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(page.getByRole('button', { name: 'Continuer' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Retour' })).toBeVisible();
  expect(page.getByText('Description de votre ménage'));
  expect(
    page.getByText(
      'Nous allons maintenant décrire les personnes qui vivent avec madameAAAAA'
    )
  ).toBeVisible();
  await page.getByRole('button', { name: 'Continuer' }).click();

  await page
    .getByLabel(
      '➡ 29. Combien de personnes vivent dans votre logement, y compris vous ?'
    )
    .click();
  await page
    .getByLabel(
      '➡ 29. Combien de personnes vivent dans votre logement, y compris vous ?'
    )
    .fill('2');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByLabel('➡ 30. Combien avez vous d’enfants à charge ?').click();
  await page
    .getByLabel('➡ 30. Combien avez vous d’enfants à charge ?')
    .fill('5');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText(
        'le ménage doit comporter au moins un adulte. Vous en déclarez -3'
      )
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await page
    .getByLabel('➡ 30. Combien avez vous d’enfants à charge ?')
    .fill('2');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText(
        'le ménage doit comporter au moins un adulte. Vous en déclarez 0'
      )
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await page
    .getByLabel(
      '➡ 30. Combien avez vous d’enfants à charge ?Controle sur nb enfantsNb adultes : 0'
    )
    .click();
  await page
    .getByLabel(
      '➡ 30. Combien avez vous d’enfants à charge ?Controle sur nb enfantsNb adultes : 0'
    )
    .fill('1');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByLabel('➡ 31. Nom').first().click();
  await page.getByLabel('➡ 31. Nom').first().press('CapsLock');
  await page.getByLabel('➡ 31. Nom').first().fill('AAA');
  await page.getByLabel('➡ 31. Nom').nth(1).click();
  await page.getByLabel('➡ 31. Nom').nth(1).fill('BBB');
  await page.getByLabel('➡ 32. Age entre 0 et 100').first().click();
  await page.getByLabel('➡ 32. Age entre 0 et 100').first().fill('18');
  await page.getByLabel('➡ 32. Age entre 0 et 100').nth(1).click();
  await page.getByLabel('➡ 32. Age entre 0 et 100').nth(1).fill('19');
  await page.getByRole('button', { name: 'Continuer' }).click();
  expect(
    page.getByText('➡ 33. AAA, quelle est votre taille en centimètres ?')
  ).toBeVisible();
  await page
    .getByLabel(
      '➡ 33. AAA, quelle est votre taille en centimètres ?Controle sur taille - si taille < 80'
    )
    .click();
  await page
    .getByLabel(
      '➡ 33. AAA, quelle est votre taille en centimètres ?Controle sur taille - si taille < 80'
    )
    .fill('175');
  await page.getByRole('button', { name: 'Continuer' }).click();
  expect(
    page.getByText('➡ 33. BBB, quelle est votre taille en centimètres ?')
  ).toBeVisible();
  await page
    .getByLabel(
      '➡ 33. BBB, quelle est votre taille en centimètres ?Controle sur taille - si taille < 80'
    )
    .click();
  await page
    .getByLabel(
      '➡ 33. BBB, quelle est votre taille en centimètres ?Controle sur taille - si taille < 80'
    )
    .fill('158');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.locator('#main').click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
});
