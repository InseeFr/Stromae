import { test, expect } from '@playwright/test';
test('QNONREG - tous types boucle nombre variable ou fixe (min=max)', async ({
  page,
}) => {
  const jsonLunatic = '/static/questionnaire/boucle-fixe/form.json';
  const serveur = 'http://localhost:3000';
  await page.goto(serveur + '/visualize');

  await page
    .getByPlaceholder(
      'http://localhost:3000/static/questionnaire/simpsons/form.json'
    )
    .fill(serveur + jsonLunatic);
  await page.getByRole('button', { name: 'Visualiser', exact: true }).click();
  expect(
    page.getByRole('heading', {
      name: 'QNONREG - tous types boucle nombre variable ou fixe (min=max) - ok',
    })
  ).toBeVisible();
  expect(page.getByText('Début')).toBeVisible();
  expect(page.getByText('Page de commencement générique.')).toBeVisible();
  await page.getByRole('button', { name: 'Commencer' }).click();
  expect(
    page.getByText(
      'I - S1 - boucle liée de 1 à max 4 avec un nb inconnu au début'
    )
  ).toBeVisible();
  await page.getByRole('button', { name: 'Continuer' }).click();
  // await page.getByRole('button', { name: 'Continuer' }).click();
  expect(page.getByRole('button', { name: 'Ajoute un prénom' })).toBeVisible();
  expect(page.getByRole('button', { name: 'Remove Row' })).toBeVisible();
  await page.getByLabel('➡ 1. PRENOM').first().fill('AA');
  expect(await page.getByLabel('➡ 1. PRENOM').first().inputValue()).toEqual(
    'AA'
  );
  await page.getByRole('button', { name: 'Ajoute un prénom' }).click();
  await page.getByLabel('➡ 1. PRENOM').nth(1).fill('BB');
  expect(await page.getByLabel('➡ 1. PRENOM').nth(1).inputValue()).toEqual(
    'BB'
  );
  await page.getByRole('button', { name: 'Ajoute un prénom' }).click();
  await page.getByLabel('➡ 1. PRENOM').nth(2).fill('CC');
  expect(await page.getByLabel('➡ 1. PRENOM').nth(2).inputValue()).toEqual(
    'CC'
  );
  expect(await page.locator('input[type="text"]').count()).toEqual(3);
  await page.getByRole('button', { name: 'Remove row' }).click();
  expect(await page.locator('input[type="text"]').count()).toEqual(2);
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByLabel('➡ 2. Q1 de AA').fill('A');

  await page.getByRole('button', { name: 'Continuer' }).click();
  await page
    .getByLabel('➡ 3. Affichage de Q2 si Q1 = A - rappel du prénom : AA')
    .fill('A2');
  await page.getByRole('button', { name: 'Continuer' }).click();
  expect(
    page.getByLabel('➡ 3. Affichage de Q2 si Q1 = A - rappel du prénom : BB')
  ).not.toBeVisible();
  await page.getByLabel('➡ 2. Q1 de BB').fill('A');
  await page.getByRole('button', { name: 'Continuer' }).click();
  expect(
    page.getByLabel('➡ 3. Affichage de Q2 si Q1 = A - rappel du prénom : BB')
  ).toBeVisible();
  await page
    .getByLabel('➡ 3. Affichage de Q2 si Q1 = A - rappel du prénom : BB')
    .fill('B2');
  await page.getByRole('button', { name: 'Continuer' }).click();
  expect(
    page.getByText(
      'II - S2 - boucle type conjoncture, de 1 à 4, ne sera pas liée'
    )
  ).toBeVisible();
  //cas sans q2 pour AA et BB
  await page.getByRole('button', { name: 'Retour' }).click();
  await page.getByRole('button', { name: 'Retour' }).click();
  await page.getByRole('button', { name: 'Retour' }).click();
  await page.getByRole('button', { name: 'Retour' }).click();
  expect(page.getByText('➡ 2. Q1 de AA')).toBeVisible();
  await page.getByLabel('➡ 2. Q1 de AA').fill('C');
  await page.getByRole('button', { name: 'Continuer' }).click();
  expect(page.getByText('➡ 2. Q1 de BB')).toBeVisible();
  await page.getByLabel('➡ 2. Q1 de BB').fill('C');
  await page.getByRole('button', { name: 'Continuer' }).click();
  expect(
    page.getByText(
      'II - S2 - boucle type conjoncture, de 1 à 4, ne sera pas liée'
    )
  ).toBeVisible();
  await page.getByRole('button', { name: 'Continuer' }).click();
  expect(
    page.getByRole('button', { name: 'Ajouter un produit' })
  ).toBeVisible();
  expect(page.getByRole('button', { name: 'Remove Row' })).toBeVisible();
  expect(page.getByText('Decrire le produit')).toBeVisible();
  expect(page.getByText('➡ 4. Décrire un produit')).toBeVisible();

  await page.getByLabel('➡ 4. Décrire un produit').fill('P1');
  expect(await page.getByLabel('➡ 4. Décrire un produit').inputValue()).toEqual(
    'P1'
  );
  await page.getByLabel('➡ 5. Avis sur produit').fill('ras');
  expect(await page.getByLabel('➡ 5. Avis sur produit').inputValue()).toEqual(
    'ras'
  );
  await page.getByRole('button', { name: 'Ajouter un produit' }).click();
  await page.getByLabel('➡ 4. Décrire un produit').nth(1).click();
  await page
    .getByLabel('➡ 4. Décrire un produitContrôle sur P1 vide')
    .nth(1)
    .fill('P2');
  expect(
    await page.getByLabel('➡ 4. Décrire un produit').nth(1).inputValue()
  ).toEqual('P2');
  await page.getByLabel('➡ 5. Avis sur produit').nth(1).fill('ras');
  expect(
    await page.getByLabel('➡ 5. Avis sur produit').nth(1).inputValue()
  ).toEqual('ras');
  expect(
    await page.getByLabel('➡ 4. Décrire un produitContrôle sur P1 vide').count()
  ).toEqual(2);
  await page.getByRole('button', { name: 'Remove row' }).click();
  expect(
    await page.getByLabel('➡ 4. Décrire un produitContrôle sur P1 vide').count()
  ).toEqual(1);
  await page.getByRole('button', { name: 'Continuer' }).click();
  expect(
    page.getByText(
      'III - S3 - boucle N occurrences, N collecté en premier, type logement'
    )
  ).toBeVisible();
  await page.getByRole('button', { name: 'Continuer' }).click();
  expect(page.getByText('➡ 6. NB')).toBeVisible();
  await page.getByLabel('➡ 6. NB').fill('3');
  expect(await page.getByLabel('➡ 6. NB').inputValue()).toEqual('3');
  await page.getByRole('button', { name: 'Continuer' }).click();
  expect(await page.getByRole('textbox').count()).toEqual(3);
  expect(await page.getByText('➡ 7. PRENOM').count()).toEqual(3);
  expect(await page.getByText('SS31').count()).toEqual(3);
  // Vérifie que le texte du premier champ de texte est égal à "A"
  await page.locator('#kwupruv2-0').fill('A');
  const textA = await page.locator('#kwupruv2-0').inputValue();
  expect(textA).toEqual('A');
  await page.locator('#kwupruv2-1').fill('B');
  // Vérifie que le texte du deuxième champ de texte est égal à "B"
  expect(await page.locator('#kwupruv2-1').inputValue()).toEqual('B');
  await page.locator('#kwupruv2-2').fill('C');
  // Vérifie que le texte du troisième champ de texte est égal à "C"
  expect(await page.locator('#kwupruv2-2').inputValue()).toEqual('C');
  await page.getByRole('button', { name: 'Continuer' }).click();
  //cas age vide
  await page.getByLabel('➡ 8. AGE de A').fill('');
  expect(await page.getByLabel('➡ 8. AGE de A').inputValue()).toEqual('');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('AGE est vide')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await page.getByLabel('➡ 8. AGE de A').fill('10');
  expect(await page.getByLabel('➡ 8. AGE de A').inputValue()).toEqual('10');
  expect(page.getByText('➡ 8. AGE de A')).toBeVisible();
  await page.getByRole('button', { name: 'Continuer' }).click();
  //cas age vide
  await page.getByLabel('➡ 8. AGE de B').fill('');
  expect(await page.getByLabel('➡ 8. AGE de B').inputValue()).toEqual('');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('AGE est vide')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  expect(page.getByText('➡ 8. AGE de B')).toBeVisible();
  await page.getByLabel('➡ 8. AGE de B').fill('11');
  expect(await page.getByLabel('➡ 8. AGE de B').inputValue()).toEqual('11');
  await page.getByRole('button', { name: 'Continuer' }).click();
  //cas age vide
  await page.getByLabel('➡ 8. AGE de C').fill('');
  expect(await page.getByLabel('➡ 8. AGE de c').inputValue()).toEqual('');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('AGE est vide')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(page.getByText('➡ 8. AGE de C')).toBeVisible();
  await page.getByLabel('➡ 8. AGE de C').fill('12');
  expect(await page.getByLabel('➡ 8. AGE de C').inputValue()).toEqual('12');
  await page.getByRole('button', { name: 'Continuer' }).click();
  //commentaire
  // expect(page.getByText('➡ 8. COMMENTAIRE')).toBeVisible();
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
  await expect(page.getByText('Validation')).toBeVisible();
  await expect(
    page.getByText('Vous êtes arrivé à la fin du questionnaire.')
  ).toBeVisible();
  await expect(
    page.getByText(
      'Merci de cliquer sur le bouton "Envoyer" pour le transmettre à l\'Insee.'
    )
  ).toBeVisible();
  await expect(
    page.getByText(
      'Après envoi, vous ne pourrez plus modifier vos réponses en ligne.'
    )
  ).toBeVisible();
  await expect(
    page.getByText('Pour toute modification, cliquer sur le bouton "Retour".')
  ).toBeVisible();
  await expect(
    page.locator('#main').getByRole('button', { name: 'Envoyer' })
  ).toBeVisible();
});
