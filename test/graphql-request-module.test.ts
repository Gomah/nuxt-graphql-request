import { fileURLToPath } from 'node:url';
import { describe, expect, test } from 'vitest';
import { setup, $fetch } from '@nuxt/test-utils';
import { load as cheerio } from 'cheerio';
import htmlSerializer from 'jest-serializer-html';

expect.addSnapshotSerializer(htmlSerializer);

describe('SSR', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixture', import.meta.url)),
  });

  test('Nuxt GraphQL Request', async () => {
    const html = await $fetch('/');
    const $ = cheerio(html);
    expect($('div#test').html()).toMatchSnapshot();
  });

  test('With AST', async () => {
    const html = await $fetch('/with-ast');
    const $ = cheerio(html);
    expect($('div#test').html()).toMatchSnapshot();
  });

  test('Using batch queries', async () => {
    const html = await $fetch('/batch');
    const $ = cheerio(html);
    expect($('div#test').html()).toMatchSnapshot();
  });

  test('With .gql Import', async () => {
    const html = await $fetch('/import');
    const $ = cheerio(html);
    expect($('div#test').html()).toMatchSnapshot();
  });
});
