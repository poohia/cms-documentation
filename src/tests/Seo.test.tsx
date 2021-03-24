import { renderHook, act } from "@testing-library/react-hooks";
import { useSeo, useConnection } from "../joazco";
import { SEO } from "../types";
import driver from "../drivers";

const email = process.env.REACT_APP_JOAZCO_USER_TEST_USERNAME || "";
const password = process.env.REACT_APP_JOAZCO_USER_TEST_PASSWORD || "";

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
  const { result } = renderHook(() => useConnection());
  const { signIn } = result.current;

  await act(async () => {
    await signIn(email, password);
  });

  const { data: user } = result.current;
  expect(user).toEqual(expect.objectContaining({ email }));
});

test("test insertSeo", async () => {
  const { result } = renderHook(() => useSeo());
  const { insertSeo } = result.current;

  await act(async () => {
    await insertSeo(data);
  });

  const { data: seo } = result.current;
  expect(seo).toStrictEqual(data);
});

test("test getSeo", async () => {
  const { result } = renderHook(() => useSeo());
  const { loadData } = result.current;

  await act(async () => await loadData());

  const { data: seo } = result.current;

  expect(seo).toStrictEqual(data);
});
