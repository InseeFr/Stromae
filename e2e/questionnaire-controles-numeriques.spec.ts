import { test, expect } from '@playwright/test';
test('Questionnaire Controles Numériques', async ({ page }) => {
  const jsonLunatic = '/static/questionnaire/numerique/form.json';
  const serveur = 'http://localhost:3000';
  await page.goto(serveur + '/visualize');

  await page
    .getByPlaceholder(
      'http://localhost:3000/static/questionnaire/simpsons/form.json'
    )
    .fill(serveur + jsonLunatic);
  await page.getByRole('button', { name: 'Visualiser', exact: true }).click();
  // Page 1
  await page.getByRole('button', { name: 'Commencer' }).click();
  //Page 2
  await page.getByRole('button', { name: 'Continuer' }).click();
  //Page 3 : Q1
  //tester avec une valeur supérieur à 100
  //tester avec une valeur inférieur à 0
  await page
    .getByLabel(
      '➡ 1. Saisie d’un entier compris entre 0 et 100 - sans controle hors format'
    )
    .fill('-5');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('La valeur doit être comprise entre 0 et 100.')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  //tester avec une bonne valeur
  await page
    .getByLabel(
      '➡ 1. Saisie d’un entier compris entre 0 et 100 - sans controle hors format'
    )
    .fill('30');
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('La valeur doit être comprise entre 0 et 100.')
  ).not.toBeVisible();
  await page.getByRole('button', { name: 'Continuer' }).click();
  //Page 4 :Q2
  //tester avec une valeur inférieur à 100
  await page
    .getByLabel(
      '➡ 2. Saisie d’un réel entre -100 et 100, 2 chiffres après virgule'
    )
    .fill('-300');
  await expect(page.getByText('QREEL vaut : -300')).toBeVisible();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('La valeur doit être comprise entre -100.00 et 100.00.')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  //tester avec une bonne valeur
  await page
    .getByLabel(
      '➡ 2. Saisie d’un réel entre -100 et 100, 2 chiffres après virgule'
    )
    .fill('90.23');
  await expect(page.getByText('QREEL vaut : 90.23')).toBeVisible();
  await page.getByRole('button', { name: 'Continuer' }).click();
  //Page 5 : Q3
  //test avec mauvaise valeur mes1
  await page
    .getByLabel(
      '➡ 3. Test de supériorité stricte - Saisie d’un nombre compris entre 0 et 100 - Si valeur supérieure à 5 message d’info. si superieur à 6 autre message'
    )
    .fill('6');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('sup à 5')
  ).toBeVisible();
  await expect(
    page.getByText('superieur à 6', { exact: true })
  ).not.toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  //test avec mauvaise valeur mes2
  await page
    .getByLabel(
      '➡ 3. Test de supériorité stricte - Saisie d’un nombre compris entre 0 et 100 - Si valeur supérieure à 5 message d’info. si superieur à 6 autre message'
    )
    .fill('20');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('sup à 5')
  ).toBeVisible();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('superieur à 6')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  // test avec bonne valeur
  await page
    .getByLabel(
      '➡ 3. Test de supériorité stricte - Saisie d’un nombre compris entre 0 et 100 - Si valeur supérieure à 5 message d’info. si superieur à 6 autre message'
    )
    .fill('2');
  await page.getByRole('button', { name: 'Continuer' }).click();
  //Page 6 : Q4
  //TODO QUELQUE SOIT LA REPONSE ON DEMANDE TOUJOURS VOUS N'avez pas repondu à la question
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('vous n’avez pas répondu à la question')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await page.getByLabel('➡ 4. Test sur valeur numérique vide').fill('0');
  await page.getByRole('button', { name: 'Continuer' }).click();
  //Page 7 : Q5
  //test avec mauvaise valeur
  await page
    .getByLabel(
      '➡ 5. Test d’infériorité stricte - Saisie d’un nombre compris entre 0 et 100 - Message si valeur inférieure à 8'
    )
    .fill('2');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('le nombre saisi est inférieur à 8')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(
    page.getByText('le nombre saisi est inférieur à 8')
  ).toBeVisible();

  // test avec bonne valeur
  await page
    .getByLabel(
      '➡ 5. Test d’infériorité stricte - Saisie d’un nombre compris entre 0 et 100 - Message si valeur inférieure à 8'
    )
    .fill('20');
  await page.getByRole('button', { name: 'Continuer' }).click();
  //Page 8 : Q6
  //test avec mauvaise valeur
  await page
    .getByLabel(
      '➡ 6. Test de supériorité non stricte - Saisie d’un nombre compris entre 0 et 100 - Test si valeur supérieure à 5'
    )
    .fill('5');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('la valeur saisie est supérieure ou égale à 5')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(
    page.getByText('la valeur saisie est supérieure ou égale à 5')
  ).toBeVisible();
  // test avec bonne valeur
  await page
    .getByLabel(
      '➡ 6. Test de supériorité non stricte - Saisie d’un nombre compris entre 0 et 100 - Test si valeur supérieure à 5'
    )
    .fill('2');

  await page.getByRole('button', { name: 'Continuer' }).click();
  // Page 9 : Q7
  //test avec mauvaise valeur
  await page
    .getByLabel(
      '➡ 7. Test d’infériorité non stricte - Saisie d’un nombre compris entre 0 et 100 - Test si valeur inférieure à 8'
    )
    .fill('8');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('La valeur saisie est inférieure ou égale à 8')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(
    page.getByText('La valeur saisie est inférieure ou égale à 8')
  ).toBeVisible();
  // test avec bonne valeur
  await page
    .getByLabel(
      '➡ 7. Test d’infériorité non stricte - Saisie d’un nombre compris entre 0 et 100 - Test si valeur inférieure à 8'
    )
    .fill('9');
  await page.getByRole('button', { name: 'Continuer' }).click();
  //Page 10 : Q8
  //test avec valeur egale à 4
  await page.getByLabel('➡ 8. Test d’égalité - Message si = 4').fill('4');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('la valeur est égale à 4')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(page.getByText('la valeur est égale à 4')).toBeVisible();
  //test avec valeur inférieur à 0
  await page.getByLabel('➡ 8. Test d’égalité - Message si = 4').fill('-2');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('La valeur doit être comprise entre 0 et 9.')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(
    page.getByText('La valeur doit être comprise entre 0 et 9.')
  ).toBeVisible();
  // test avec valeur non equal à 4
  await page.getByLabel('➡ 8. Test d’égalité - Message si = 4').fill('9');
  await page.getByRole('button', { name: 'Continuer' }).click();
  //Page 11 : Q9
  await page.getByLabel('➡ 9. Test d’égalité à 0 - Message si = 0').fill('0');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('La valeur est zéro')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(page.getByText('La valeur est zéro')).toBeVisible();
  //test avec valeur inférieur à 0
  await page.getByLabel('➡ 9. Test d’égalité à 0 - Message si = 0').fill('-2');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('La valeur doit être comprise entre 0 et 9.')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(
    page.getByText('La valeur doit être comprise entre 0 et 9.')
  ).toBeVisible();
  // test avec une valeur entre 0 et  9
  await page.getByLabel('➡ 9. Test d’égalité à 0 - Message si = 0').fill('3');
  await page.getByRole('button', { name: 'Continuer' }).click();
  //Page 12 : Q10
  //valeur supérieur à la constante
  await page
    .getByLabel(
      '➡ 10. Test d’un reel par rapport à une constante négative à virgule - test des positionnements par rapport à -4.51 (sup, inf, égal)'
    )
    .fill('3');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('la valeur est supérieure à -4.51')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(
    page.getByText('la valeur est supérieure à -4.51', { exact: true })
  ).toBeVisible();
  // valeur inférieur à la constante
  await page
    .getByLabel(
      '➡ 10. Test d’un reel par rapport à une constante négative à virgule - test des positionnements par rapport à -4.51 (sup, inf, égal)'
    )
    .fill('-9');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('la valeur est inférieure à -4.51')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(
    page.getByText('la valeur est inférieure à -4.51', { exact: true })
  ).toBeVisible();
  //valeur egale à la constante
  await page
    .getByLabel(
      '➡ 10. Test d’un reel par rapport à une constante négative à virgule - test des positionnements par rapport à -4.51 (sup, inf, égal)'
    )
    .fill('-4.51');
  await page.getByRole('button', { name: 'Continuer' }).click();
  //Page 13 :Q11
  //valeur supérieur à la constante
  await page
    .getByLabel(
      '➡ 11. Test d’un réel par rapport à une constante positive décimale - test des positionnements par rapport à 4.51 (sup, inf, égal)'
    )
    .fill('9');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('superieur à 4.51')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(
    page.getByText('superieur à 4.51', { exact: true })
  ).toBeVisible();
  // valeur inférieur à la constante
  await page
    .getByLabel(
      '➡ 11. Test d’un réel par rapport à une constante positive décimale - test des positionnements par rapport à 4.51 (sup, inf, égal)'
    )
    .fill('3');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('inferieur à 4.51')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(
    page.getByText('inferieur à 4.51', { exact: true })
  ).toBeVisible();
  //valeur egale à la constante
  await page
    .getByLabel(
      '➡ 11. Test d’un réel par rapport à une constante positive décimale - test des positionnements par rapport à 4.51 (sup, inf, égal)'
    )
    .fill('4.51');
  await page.getByRole('button', { name: 'Continuer' }).click();
  //Page 14 : Q12
  //valeur supérieur à la constante
  await page
    .getByLabel(
      '➡ 12. Test d’un réel par rapport à une constante entière - test des positionnements par rapport à 4 (sup, égal)'
    )
    .fill('9');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('superieur à 4')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(page.getByText('superieur à 4', { exact: true })).toBeVisible();
  // valeur inférieur à la constante
  await page
    .getByLabel(
      '➡ 12. Test d’un réel par rapport à une constante entière - test des positionnements par rapport à 4 (sup, égal)'
    )
    .fill('2');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('inferieur à 4')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(page.getByText('inferieur à 4', { exact: true })).toBeVisible();
  //valeur egale à la constante
  await page
    .getByLabel(
      '➡ 12. Test d’un réel par rapport à une constante entière - test des positionnements par rapport à 4 (sup, égal)'
    )
    .fill('4');
  await page.getByRole('button', { name: 'Continuer' }).click();
  //page 15 : Q13
  await page
    .getByLabel(
      '➡ 13. Test d’un grand réel par rapport à une constante (max = 1000000000) - test des positionnements par rapport à 1000 - Personnalisation du message d’erreur avec la valeur (précision = 2, max = 1000000000)'
    )
    .fill('222222222');
  await expect(
    page.getByText('Affichage de 2* GRAND :444444444', { exact: true })
  ).toBeVisible();
  await page
    .getByLabel(
      '➡ 13. Test d’un grand réel par rapport à une constante (max = 1000000000) - test des positionnements par rapport à 1000 - Personnalisation du message d’erreur avec la valeur (précision = 2, max = 1000000000)'
    )
    .fill('1000000000');
  await expect(
    page.getByText('Affichage de 2* GRAND :2000000000', { exact: true })
  ).toBeVisible();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page.getByText(
      'Les nombres sont QREL et QREL2 Leur somme vaut CALC_SOMME - Leur produit vaut CALC_PRODUIT - Leur différence vaut CALC_DIFFERENCE - Leur division vaut CALC_RATIO',
      { exact: true }
    )
  ).toBeVisible();
  await page.getByRole('button', { name: 'Continuer' }).click();
  //Page 17 : Q14
  await page
    .getByLabel(
      '➡ 14. Test sur ordre de deux variables - partie 1 - les contrôles portent sur la question suivante '
    )
    .fill('-101');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('La valeur doit être comprise entre -100.00 et 100.00.')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(
    page.getByText('La valeur doit être comprise entre -100.00 et 100.00.', {
      exact: true,
    })
  ).toBeVisible();
  await page
    .getByLabel(
      '➡ 14. Test sur ordre de deux variables - partie 1 - les contrôles portent sur la question suivante '
    )
    .fill('101');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('La valeur doit être comprise entre -100.00 et 100.00.')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(
    page.getByText('La valeur doit être comprise entre -100.00 et 100.00.', {
      exact: true,
    })
  ).toBeVisible();
  await page
    .getByLabel(
      '➡ 14. Test sur ordre de deux variables - partie 1 - les contrôles portent sur la question suivante '
    )
    .fill('7');
  await page.getByRole('button', { name: 'Continuer' }).click();
  //Page 18 : Q15
  await page
    .getByLabel('➡ 15. Test sur ordre de deux variables - partie 2')
    .fill('-101');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('La valeur doit être comprise entre -100.00 et 100.00.')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(
    page.getByText('La valeur doit être comprise entre -100.00 et 100.00.', {
      exact: true,
    })
  ).toBeVisible();
  await page
    .getByLabel('➡ 15. Test sur ordre de deux variables - partie 2')
    .fill('101');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('La valeur doit être comprise entre -100.00 et 100.00.')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(
    page.getByText('La valeur doit être comprise entre -100.00 et 100.00.', {
      exact: true,
    })
  ).toBeVisible();
  await page
    .getByLabel('➡ 15. Test sur ordre de deux variables - partie 2')
    .fill('7');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('les deux nombres sont égaux')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(
    page.getByText('les deux nombres sont égaux', {
      exact: true,
    })
  ).toBeVisible();
  await page
    .getByLabel('➡ 15. Test sur ordre de deux variables - partie 2')
    .fill('2');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('le premier nombre est supérieur')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(
    page.getByText('le premier nombre est supérieur', {
      exact: true,
    })
  ).toBeVisible();
  await page
    .getByLabel('➡ 15. Test sur ordre de deux variables - partie 2')
    .fill('9.22');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('le premier nombre est inférieur')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(
    page.getByText('le premier nombre est inférieur', {
      exact: true,
    })
  ).toBeVisible();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByRole('button', { name: 'Poursuivre' }).click();

  //Page 19: Q16
  await expect(
    page.getByText('rappel QREL2 : 9.22', {
      exact: true,
    })
  ).toBeVisible();
  await page
    .getByLabel(
      '➡ 16. Test entre un entier et un réel - saisir entre 0 et 100 - controle sur saisie > QREL2'
    )
    .fill('12');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('saisie > QREL2')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(
    page.getByText('saisie > QREL2', {
      exact: true,
    })
  ).toBeVisible();
  await page
    .getByLabel(
      '➡ 16. Test entre un entier et un réel - saisir entre 0 et 100 - controle sur saisie > QREL2'
    )
    .fill('2');

  await page.getByRole('button', { name: 'Continuer' }).click();
  //Page 20: Q17
  await expect(
    page.getByText('QREL 7', {
      exact: true,
    })
  ).toBeVisible();
  await expect(
    page.getByText('QREL2 9.22', {
      exact: true,
    })
  ).toBeVisible();
  await expect(
    page.getByText('ratio calculé : 0.76', {
      exact: true,
    })
  ).toBeVisible();
  await page
    .getByLabel(
      '➡ 17. Test avec une variable calculée : le ratio - Saisissez une valeur pour la comparer à la division des deux nombres précédents'
    )
    .fill('3');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('Ratio différent')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(
    page.getByText('Ratio différent', {
      exact: true,
    })
  ).toBeVisible();
  await page
    .getByLabel(
      '➡ 17. Test avec une variable calculée : le ratio - Saisissez une valeur pour la comparer à la division des deux nombres précédents'
    )
    .fill('0.76');
  await page.getByRole('button', { name: 'Continuer' }).click();
  //Page 21: Q18
  await expect(
    page.getByText('QREL : 7', {
      exact: true,
    })
  ).toBeVisible();
  await expect(
    page.getByText('QREL2 : 9.22', {
      exact: true,
    })
  ).toBeVisible();
  await expect(
    page.getByText('somme calculée : 16.22', {
      exact: true,
    })
  ).toBeVisible();
  await page
    .getByLabel(
      '➡ 18. test avec une variable calculée : la somme - Saisissez une valeur pour la comparer à la somme des deux nombres précédents'
    )
    .fill('11');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('la valeur saisie est inférieure à la somme')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(
    page.getByText('la valeur saisie est inférieure à la somme', {
      exact: true,
    })
  ).toBeVisible();
  await page
    .getByLabel(
      '➡ 18. test avec une variable calculée : la somme - Saisissez une valeur pour la comparer à la somme des deux nombres précédents'
    )
    .fill('17');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('La valeur saisie est supérieure à la somme')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(
    page.getByText('La valeur saisie est supérieure à la somme', {
      exact: true,
    })
  ).toBeVisible();
  await page
    .getByLabel(
      '➡ 18. test avec une variable calculée : la somme - Saisissez une valeur pour la comparer à la somme des deux nombres précédents'
    )
    .fill('16.22');

  await page.getByRole('button', { name: 'Continuer' }).click();
  //Page 22 : 19
  await page
    .getByLabel(
      '➡ 19. Test avec une variable calculée : le produit - Saisissez une valeur pour la comparer au produit des deux nombres précédents'
    )
    .fill('88');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('la valeur saisie est différente du produit')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(
    page.getByText('la valeur saisie est différente du produit', {
      exact: true,
    })
  ).toBeVisible();
  await page
    .getByLabel(
      '➡ 19. Test avec une variable calculée : le produit - Saisissez une valeur pour la comparer au produit des deux nombres précédents'
    )
    .fill('65,54');
  await page.getByRole('button', { name: 'Continuer' }).click();
  //TODO A REVOIR pourquoi ça ne se valide pas sur playwright alors que ça marche sur pogues stromae v2
  await page.getByRole('button', { name: 'Poursuivre' }).click();
  //Page 23 : Q20
  await page
    .getByLabel(
      '➡ 20. Test avec une variable calculée : la différence - Saisissez une valeur pour la comparer au produit des deux nombres précédents'
    )
    .fill('99');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await expect(
    page
      .getByRole('dialog', { name: 'Des points requièrent votre attention.' })
      .getByText('Différence')
  ).toBeVisible();
  await page.getByRole('button', { name: 'Corriger ma réponse' }).click();
  await expect(
    page.getByText('Différence', {
      exact: true,
    })
  ).toBeVisible();
  await page
    .getByLabel(
      '➡ 20. Test avec une variable calculée : la différence - Saisissez une valeur pour la comparer au produit des deux nombres précédents'
    )
    .fill('-2.22');
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();
  await page.getByRole('button', { name: 'Continuer' }).click();

  //tester le bouton retour et vérification que toutes les réponses sont sauvegardés
  // valider le formulaire
});
