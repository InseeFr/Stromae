import { test, expect } from '@playwright/test';
test('Questionnaire Controles Boucles Liées', async ({ page }) => {
  const jsonLunatic = '/static/questionnaire/boucle-liees/form.json';
  const serveur = 'http://localhost:3000';
  await page.goto(serveur + '/visualize');

  await page
    .getByPlaceholder(
      'http://localhost:3000/static/questionnaire/simpsons/form.json'
    )
    .fill(serveur + jsonLunatic);
  await page.getByRole('button', { name: 'Visualiser', exact: true }).click();
  await page.getByRole('button', { name: 'Commencer' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByRole('radio', { name: 'Oui' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByRole('radio', { name: 'Oui' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText(
        'Vous avez indiqué avoir deux résidences principales, pouvez-vous corriger l’une de vos réponses ?'
      )
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await page.getByRole('radio', { name: 'Non' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByLabel('➡ 3. NBHAB : controle si > 5').fill('9');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('supérieur à 5')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  //test valeur négative : erreur serveur
  // await page.getByLabel('➡ 3. NBHAB : controle si > 5').fill('-2');
  await page.getByLabel('➡ 3. NBHAB : controle si > 5').fill('2');
  await page.getByRole('button', { name: 'Continuer' }).click();
  expect(await page.getByRole('textbox').count()).toEqual(2);
  //TODO AJOUT CONTROLE PRENOM VIDE
  await page.getByLabel('➡ 4. Prénom').first().fill('A');
  await page.getByLabel('➡ 4. Prénom').nth(1).fill('BBB');
  expect(await page.getByLabel('➡ 4. Prénom').first().inputValue()).toEqual(
    'A'
  );
  expect(await page.getByLabel('➡ 4. Prénom').nth(1).inputValue()).toEqual(
    'BBB'
  );
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('Remplir Q1 INDIV')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await page.getByRole('radio', { name: 'Oui' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByRole('radio', { name: 'Oui' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('Q1 et Q2 de A incompatibles')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await page.getByRole('radio', { name: 'Non' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page
    .getByLabel('➡ 7. Montant entre 0 et 100 pour l’individu A')
    .fill('120');

  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('inférieur à 10')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  //valeur négative
  await page
    .getByLabel('➡ 7. Montant entre 0 et 100 pour l’individu A')
    .fill('-78');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('La valeur doit être comprise entre 0 et 100.')
  ).toBeVisible();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('inférieur à 10')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await page
    .getByLabel('➡ 7. Montant entre 0 et 100 pour l’individu A')
    .fill('78');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('Remplir Q1 INDIV')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await page.getByRole('radio', { name: 'Oui' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByRole('radio', { name: 'Oui' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('Q1 et Q2 de BBB incompatibles')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await page.getByRole('radio', { name: 'Non' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page
    .getByLabel('➡ 7. Montant entre 0 et 100 pour l’individu BBB')
    .fill('130');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('inférieur à 10')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  //valeur négative
  await page
    .getByLabel('➡ 7. Montant entre 0 et 100 pour l’individu BBB')
    .fill('-78');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('inférieur à 10')
  ).toBeVisible();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('inférieur à 10')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await page
    .getByLabel('➡ 7. Montant entre 0 et 100 pour l’individu BBB')
    .fill('72');
  await page.getByRole('button', { name: 'Continuer' }).click();
  //fin
  expect(page.getByText('➡ 8. FIN')).toBeVisible();
  await page.getByLabel('➡ 8. FIN').fill('FIN');
  expect(await page.getByLabel('➡ 8. FIN').inputValue()).toEqual('FIN');
  await page.getByRole('button', { name: 'Continuer' }).click();
  //commentaire
  await expect(page.getByText('COMMENTAIRE')).toBeVisible();
  await page.getByRole('button', { name: 'Continuer' }).click();
  //remarques
  expect(
    page.getByText(
      "Avez-vous des remarques concernant l'enquête ou des commentaires ?"
    )
  ).toBeVisible();
  await page
    .getByLabel(
      "Avez-vous des remarques concernant l'enquête ou des commentaires ?"
    )
    .fill('RAS');
  expect(
    await page
      .getByLabel(
        "Avez-vous des remarques concernant l'enquête ou des commentaires ?"
      )
      .inputValue()
  ).toEqual('RAS');
  await page.getByRole('button', { name: 'Continuer' }).click();
  expect(page.getByText('Validation')).toBeVisible();
  expect(
    page.getByText('Vous êtes arrivé à la fin du questionnaire.')
  ).toBeVisible();
  expect(
    page.getByText(
      'Merci de cliquer sur le bouton "Envoyer" pour le transmettre à l\'Insee.'
    )
  ).toBeVisible();
  expect(
    page.getByText(
      'Après envoi, vous ne pourrez plus modifier vos réponses en ligne.'
    )
  ).toBeVisible();
  expect(
    page.getByText('Pour toute modification, cliquer sur le bouton "Retour".')
  ).toBeVisible();
  expect(
    page.locator('#main').getByRole('button', { name: 'Envoyer' })
  ).toBeVisible();
  await page.locator('#main').click();
});
