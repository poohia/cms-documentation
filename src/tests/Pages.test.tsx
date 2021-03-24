import { renderHook, act } from "@testing-library/react-hooks";
import { useConnection, usePages, usePage } from "../joazco";
import { Page } from "../types";

const email = process.env.REACT_APP_JOAZCO_USER_TEST_USERNAME || "";
const password = process.env.REACT_APP_JOAZCO_USER_TEST_PASSWORD || "";

const data: Page = {
  id: "123467",
  title: "My page",
  slug: "my-page",
  content: "",
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

test("test createPage", async () => {
  const { result } = renderHook(() => usePages());
  const { createPage } = result.current;

  await act(async () => {
    await createPage(data.title, data.slug, data.id);
  });

  const { data: pages } = result.current;
  const pageFind = pages.find((page) => page.slug === data.slug);
  expect(pageFind).toStrictEqual(data);
});

test("test getPages", async () => {
  const { result } = renderHook(() => usePages());
  const { loadData } = result.current;

  await act(async () => {
    await loadData();
  });

  const { data: pages } = result.current;
  const pageFind = pages.find((page) => page.slug === data.slug);
  expect(pageFind).toStrictEqual(data);
});

test("test updatePage", async () => {
  const { result } = renderHook(() => usePage({ id: data.id }));
  const { updatePage } = result.current;

  const content = "<div>Hello world</div>";

  await act(async () => {
    await updatePage({ ...data, content }, data.id);
  });

  const { data: page } = result.current;

  expect(page).toStrictEqual({ ...data, content });
});

test("test removePage", async () => {
  const { result } = renderHook(() => usePages());
  const { removePage } = result.current;

  await act(async () => {
    await removePage(data.id);
  });

  const { data: pages } = result.current;
  const pageFind = pages.find((page) => page.slug === data.slug);
  expect(pageFind).toStrictEqual(undefined);
});
