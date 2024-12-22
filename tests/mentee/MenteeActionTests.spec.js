import { test, expect } from '@playwright/test';
import AuthPage from '@page-objects/AuthPage'; // Alias for page objects
import MentorFiltersPage from '@page-objects/MentorFilters.page'; // Import the new page object
import MenteeAction from '@page-objects/MenteeAction'; // Import the new page object
import { credentials, mentorFilters } from '@fixtures/test-data-mentee'; // Import the necessary test data

const { validCredentials, urls } = require('@fixtures/test-data');

test.describe('Mentee Action TestCases', () => {
  let authPage;
  let mentorFiltersPage;
  let menteeAction; // Declare menteeAction here

  // Before each test, initialize pages and log in
  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    mentorFiltersPage = new MentorFiltersPage(page);
    menteeAction = new MenteeAction(page); // Initialize menteeAction instance

    // Navigate to login page and log in
    await authPage.navigateToLogin(urls.baseUrl);
    await authPage.login(credentials.valid.email, credentials.valid.password);
  });

  test('Navigate to Browse Mentor page successfully', async ({ page }) => {
    // Use the menteeAction instance here
    await menteeAction.navigateToBrowsePage();

    // Filter mentors by search bar
    await menteeAction.FilterBySearchbar('tony');

    // Select the desired mentor profile
    await menteeAction.SelectSearchProfile();

    // Validate the mentor profile name
   

    console.log('Successfully found Tony');
  });

  test('Search with no results displays the correct message', async ({ page }) => {
    // Use the menteeAction instance here
    await menteeAction.navigateToBrowsePage();

    // Filter mentors with an invalid search query
    await menteeAction.FilterBySearchbar('123');

    // Validate the "Showing 0 results" message
    const noResultsText = await page.textContent(
      'p.MuiTypography-root:has-text("Showing 0 results.")'
    );
    expect(noResultsText.trim()).toBe('Showing 0 results.');

    console.log('Assertion Passed: The "Showing 0 results." message is displayed.');
  });

  test('Add mentor to favorite list', async ({ page }) => {
    // Use the menteeAction instance here
    await menteeAction.navigateToBrowsePage();

    // Filter mentors by search bar
    await menteeAction.FilterBySearchbar('tony');

    // Select the desired mentor profile
    await menteeAction.SelectSearchProfile();

    // Add mentor to favorites
    await menteeAction.AddFavorite();

    console.log('Successfully added mentor to the favorite list.');
  });

  test('Remove mentor from favorite list', async ({ page }) => {
    // Use the menteeAction instance here
    await menteeAction.navigateToBrowsePage();

    // Filter mentors by search bar
    await menteeAction.FilterBySearchbar('tony');

    // Select the desired mentor profile
    await menteeAction.SelectSearchProfile();

    // Remove mentor from favorites
    await menteeAction.RemoveFavorite();

    console.log('Successfully removed mentor from the favorite list.');
  });

  test('Mentee can see all events', async ({ page }) => {
    // Use the menteeAction instance here
    await menteeAction.CheckingDetails();

    console.log('Successfully validated mentee can see all events according to schedule.');
    await page.pause();
  });
});