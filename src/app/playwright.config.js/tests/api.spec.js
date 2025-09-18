// tests/api.spec.js
const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:3000';

test.describe('Companies API', () => {
  // 1. count
  test('GET /api/companies/count', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/companies/count`);
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(typeof body.total).toBe('number');
    expect(body.total).toBeGreaterThan(0);
  });

  // 2. inside tests/api.spec.js — updated top-paid test only
test('GET /api/companies/top-paid', async ({ request }) => {
  const res = await request.get(`${BASE_URL}/api/companies/top-paid`);
  expect(res.ok()).toBeTruthy();

  const companies = await res.json();
  expect(Array.isArray(companies)).toBeTruthy();
  expect(companies.length).toBeLessThanOrEqual(5);

  // Helper: get numeric base if possible, otherwise null
  const getNumericBase = (c) => {
    if (!c || !c.salaryBand) return null;
    const base = c.salaryBand.base;
    if (typeof base === 'number' && Number.isFinite(base)) return base;
    // allow numeric strings like "120000"
    const parsed = Number(base);
    return Number.isFinite(parsed) ? parsed : null;
  };

  // Ensure each item has a numeric base (or at least can be parsed to one).
  for (let i = 0; i < companies.length; i++) {
    const nb = getNumericBase(companies[i]);
    expect(nb, `company at index ${i} has invalid salaryBand.base: ${JSON.stringify(companies[i])}`).not.toBeNull();
  }

  // If we have at least two items, assert descending order using their numeric value
  if (companies.length > 1) {
    for (let i = 1; i < companies.length; i++) {
      const prev = getNumericBase(companies[i - 1]);
      const curr = getNumericBase(companies[i]);
      expect(prev).toBeGreaterThanOrEqual(curr);
    }
  }

  // test limit param
  const res10 = await request.get(`${BASE_URL}/api/companies/top-paid?limit=10`);
  expect(res10.ok()).toBeTruthy();
  const companies10 = await res10.json();
  expect(Array.isArray(companies10)).toBeTruthy();
  expect(companies10.length).toBeLessThanOrEqual(10);
});


  // 3. by-skill
  test('GET /api/companies/by-skill/:skill', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/companies/by-skill/DSA`);
    expect(res.ok()).toBeTruthy();
    const companies = await res.json();
    expect(Array.isArray(companies)).toBeTruthy();
  });

  // 4. by-location
  test('GET /api/companies/by-location/:location', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/companies/by-location/Hyderabad`);
    expect(res.ok()).toBeTruthy();
    const companies = await res.json();
    expect(Array.isArray(companies)).toBeTruthy();
  });

  // 5. headcount-range
  test('GET /api/companies/headcount-range', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/companies/headcount-range?min=1000&max=5000`);
    expect(res.ok()).toBeTruthy();
    const companies = await res.json();
    expect(Array.isArray(companies)).toBeTruthy();
    expect(companies.every(c => typeof c.headcount === 'number' && c.headcount >= 1000 && c.headcount <= 5000)).toBeTruthy();
  });

  // 6. benefit
  test('GET /api/companies/benefit/:benefit', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/companies/benefit/Insurance`);
    expect(res.ok()).toBeTruthy();
    const companies = await res.json();
    expect(Array.isArray(companies)).toBeTruthy();
  });
});
