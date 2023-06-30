import { test, expect } from '@playwright/test';
test('QNONREG - sum, min dans une boucle et sur controle prénom et test filtre occurrence', async ({
  page,
}) => {
  const jsonLunatic = '/static/questionnaire/sum-min/form.json';
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
  await page.getByLabel('➡ 1. NB').fill('2');
  expect(await page.getByLabel('➡ 1. NB').inputValue()).toEqual('2');
  await page.getByRole('button', { name: 'Continuer' }).click();
  expect(await page.getByRole('textbox').count()).toEqual(2);
  await page.locator('#ksyjvi40-0').fill('AA');
  expect(await page.locator('#ksyjvi40-0').inputValue()).toEqual('AA');
  await page.locator('#ksyjvi40-1').fill('BB');
  expect(await page.locator('#ksyjvi40-1').inputValue()).toEqual('BB');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  expect(await page.getByText('➡ 3. Age de l’individu : AA')).toBeVisible();
  await page.getByLabel('➡ 3. Age de l’individu : AA').fill('22');
  expect(
    await page.getByLabel('➡ 3. Age de l’individu : AA').inputValue()
  ).toEqual('22');
  expect(await page.getByText('IND_MAJEUR :1')).toBeVisible();
  expect(await page.getByText('AGE vaut : 22')).toBeVisible();
  await page.getByRole('button', { name: 'Continuer' }).click();
  expect(await page.getByText('➡ 3. Age de l’individu : BB')).toBeVisible();
  await page.getByLabel('➡ 3. Age de l’individu : BB').fill('12');
  expect(
    await page.getByLabel('➡ 3. Age de l’individu : BB').inputValue()
  ).toEqual('12');
  expect(await page.getByText('IND_MAJEUR :0')).toBeVisible();
  expect(await page.getByText('AGE vaut : 12')).toBeVisible();
  await page.getByRole('button', { name: 'Continuer' }).click();
  //TODO
  expect(page.getByText('Affichage du nb de majeurs : 1')).toBeVisible();
  expect(page.getByText('Affichage du somme age : 34')).toBeVisible();
  expect(
    page.getByText('Affichage du min des ages sans cast: 12')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Continuer' }).click();
  //DIVERS
  expect(page.getByText('➡ 4. divers')).toBeVisible();
  await page.getByRole('button', { name: 'Continuer' }).click();
  //TODO
  expect(page.getByText('Affichage de la somme des ages : 34')).toBeVisible();
  expect(page.getByText('Affichage du nb de majeurs : 1')).toBeVisible();
  expect(page.getByText('Affichage du min des ages : 12')).toBeVisible();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
});
