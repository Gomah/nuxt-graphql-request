const config = require('../fixture/nuxt.config.js');
const request = require('request-promise-native');
const { Nuxt, Builder } = require('nuxt');

const url = (path) => `http://localhost:3000${path}`;
const get = (path) => request(url(path));

let nuxt;
let addTemplate;

const setupNuxt = async (config) => {
  nuxt = new Nuxt(config);

  // Spy addTemplate
  addTemplate = nuxt.moduleContainer.addTemplate = jest.fn(nuxt.moduleContainer.addTemplate);

  const build = new Builder(nuxt);

  await build.validatePages();
  await build.generateRoutesAndFiles();
  await nuxt.listen(3000);
};

jest.setTimeout(10000);

describe('Nuxt GraphQL Request', () => {
  beforeAll(async () => {
    nuxt = new Nuxt(config);

    // Spy addTemplate
    addTemplate = nuxt.moduleContainer.addTemplate = jest.fn(nuxt.moduleContainer.addTemplate);

    await new Builder(nuxt).build();
    await nuxt.listen(3000);
  }, 60000);

  afterAll(async () => {
    await nuxt.close();
  });

  test('SSR', async () => {
    const html = await get('/');
    expect(html).toContain('Belgium');
  });

  test('CSR', async () => {
    const window = await nuxt.renderAndGetWindow(url('/'));

    window.onNuxtReady(() => {
      const html = window.document.body.innerHTML;
      expect(html).toContain('Belgium');
    });
  });
});

describe('With AST', () => {
  beforeAll(async () => {
    await setupNuxt(config);
  });

  afterAll(async () => {
    await nuxt.close();
  });

  test('SSR', async () => {
    const html = await get('/with-ast');
    expect(html).toContain('Belgium');
  });

  test('CSR', async () => {
    const window = await nuxt.renderAndGetWindow(url('/with-ast'));

    window.onNuxtReady(() => {
      const html = window.document.body.innerHTML;
      expect(html).toContain('Belgium');
    });
  });
});

describe('With .gql Import', () => {
  beforeAll(async () => {
    await setupNuxt(config);
  });

  afterAll(async () => {
    await nuxt.close();
  });

  test('SSR', async () => {
    const html = await get('/import');
    expect(html).toContain('Belgium');
  });

  test('CSR', async () => {
    const window = await nuxt.renderAndGetWindow(url('/import'));

    window.onNuxtReady(() => {
      const html = window.document.body.innerHTML;
      expect(html).toContain('Belgium');
    });
  });
});

describe('Uses runtime config', () => {
    beforeAll(async () => {
        const newConfig = {
            ...config,
            publicRuntimeConfig: {
                GRAPHQL_ENDPOINT: config.endpoint,
            },
        };

        delete newConfig.endpoint;

        await setupNuxt(newConfig);
    });

    afterAll(async () => {
        await nuxt.close();
    });

    test('SSR', async () => {
        const html = await get('/');
        expect(html).toContain('Belgium');
    });

    test('CSR', async () => {
        const window = await nuxt.renderAndGetWindow(url('/'));

        window.onNuxtReady(() => {
            const html = window.document.body.innerHTML;
            expect(html).toContain('Belgium');
        });
    });
});
