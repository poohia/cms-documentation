import { renderHook, act } from "@testing-library/react-hooks";
import { useConnection, usePages } from "../joazco/hooks";
import { Page } from "../types";
import driver from "../drivers";

const email = process.env.REACT_APP_JAZZI_USER_TEST_USERNAME || "";
const password = process.env.REACT_APP_JAZZI_USER_TEST_PASSWORD || "";

const data: Omit<Page, "content"> = {
  id: "123467",
  title: "My page",
  slug: "my-page",
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

test("test createPage", async () => {
  const { result } = renderHook(() => usePages(driver));
  const { createPage } = result.current;

  await act(async () => {
    await createPage(data.title, data.slug, data.id)
      .then((value) => expect(value.slug).toStrictEqual(data.slug))
      .catch(() => expect(false).toBeTruthy());
  });
});

test("test getPages", async () => {
  const { result } = renderHook(() => usePages(driver));
  const { getPages } = result.current;

  await act(async () => {
    await getPages();
  });

  const { pages } = result.current;
  expect(pages[0].slug).toStrictEqual(data.slug);
});

test("test updatePage", async () => {
  const { result } = renderHook(() => usePages(driver));
  const { updatePage } = result.current;

  await act(async () => {
    await updatePage({ ...data, content: "<div>Hello world</div>" }, data.id)
      .then((value) => expect(value.slug).toStrictEqual(data.slug))
      .catch(() => expect(false).toBeTruthy());
  });
});

test("test removePage", async () => {
  const { result } = renderHook(() => usePages(driver));
  const { removePage } = result.current;

  await act(async () => {
    await removePage(data.id);
  });

  const { pages } = result.current;
  expect(pages).toStrictEqual([]);
});
