import {
  BrowserCheck,
  CheckGroup,
} from '@checkly/cli/dist/constructs';

const group = new CheckGroup("gcakes-e2e", {
  name: "GCakes E2E",
  activated: true,
  locations: ["ap-east-1"],
  tags: ['gcakes-e2e'],
  browserChecks: {
    testMatch: "**/tests/**/*.spec.ts"
  }
})

new BrowserCheck("login-check", {
  name: "Login Check",
  code: {
    entrypoint: '../tests/login.spec.ts'
  },
  group: group
})

new BrowserCheck("about-check", {
  name: "About Check",
  code: {
    entrypoint: '../tests/about.spec.ts'
  },
  group: group
})

new BrowserCheck("registration-check", {
  name: "Registration Check",
  code: {
    entrypoint: '../tests/registration.spec.ts'
  },
  group: group
})

new BrowserCheck("review-check", {
  name: "Review Check",
  code: {
    entrypoint: '../tests/review.spec.ts'
  },
  group: group
})

new BrowserCheck("addtocart-check", {
  name: "Add to Cart Check",
  code: {
    entrypoint: '../tests/addtocart.spec.ts'
  },
  group: group
})

new BrowserCheck("cakes-check", {
  name: "Cakes Page Check",
  code: {
    entrypoint: '../tests/cakes.spec.ts'
  },
  group: group
})

new BrowserCheck("decoratedCookies-check", {
  name: "Decorated Cookies Page Check",
  code: {
    entrypoint: '../tests/decoratedCookies.spec.ts'
  },
  group: group
})

new BrowserCheck("cupcakes-check", {
  name: "Cupcakes Page Check",
  code: {
    entrypoint: '../tests/cupcakes.spec.ts'
  },
  group: group
})

new BrowserCheck("product-check", {
  name: "Product Page Check",
  code: {
    entrypoint: '../tests/product.spec.ts'
  },
  group: group
})