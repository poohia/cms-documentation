import { renderHook, act } from "@testing-library/react-hooks";
import { useConnection, useSeo } from "../joazco/hooks";
import { SEO } from "../types";
import driver from "../drivers";

const email = process.env.REACT_APP_JAZZI_USER_TEST_USERNAME || "";
const password = process.env.REACT_APP_JAZZI_USER_TEST_PASSWORD || "";

const data: SEO = {
  title: "test",
  description: "test description",
  keywords: "keyword1, keyword2",
  links: {
    website: "http://website.com",
    git: "http://git.com",
  },
  favIcon: "https://favicon.ico",
};

test("stay signIn", async () => {
  const { result } = renderHook(() => useConnection(driver));
  const { signIn } = result.current;

  await act(async () => {
    await signIn(email, password);
  });

  const { logged } = result.current;
  expect(logged).toBeTruthy();
});

test("test insertSeo", async () => {
  const { result } = renderHook(() => useSeo(driver));
  const { insertSeo } = result.current;

  await act(async () => {
    await insertSeo(data);
  });

  const { seo } = result.current;
  expect(seo).toStrictEqual(data);
});

test("test getSeo", async () => {
  const { result } = renderHook(() => useSeo(driver));
  const { getSeo } = result.current;

  await act(async () => {
    await getSeo();
  });

  const { seo } = result.current;
  expect(seo).toStrictEqual(data);
});
