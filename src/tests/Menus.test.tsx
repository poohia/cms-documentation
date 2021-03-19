import { renderHook, act } from "@testing-library/react-hooks";
import { useConnection, useMenus } from "../joazco/hooks";
import { Menu, Page } from "../types";
import driver from "../drivers";

const email = process.env.REACT_APP_JAZZI_USER_TEST_USERNAME || "";
const password = process.env.REACT_APP_JAZZI_USER_TEST_PASSWORD || "";
const locale = process.env.REACT_APP_JAZZI_TEST_TABLE || "test";

const data: Pick<Menu, "title" | "id" | "caption"> = {
  id: "123467",
  title: "My page",
  caption: "caption",
};

const pages: Page[] = [
  {
    id: "test",
    content: "",
    slug: "test",
    title: "test",
  },
];

test("stay signIn", async () => {
  const { result } = renderHook(() => useConnection(driver));
  const { signIn } = result.current;

  await act(async () => {
    await signIn(email, password);
  });

  const { logged } = result.current;
  expect(logged).toBeTruthy();
});

test("test createMenu", async () => {
  const { result } = renderHook(() => useMenus(driver, pages));
  const { createMenu } = result.current;

  await act(async () => {
    await createMenu(data.title, data.caption, data.id)
      .then((value) => expect(value.title).toStrictEqual(data.title))
      .catch(() => expect(false).toBeTruthy());
  });
});

test("test getMenus", async () => {
  const { result } = renderHook(() => useMenus(driver, pages));
  const { getMenus } = result.current;

  await act(async () => {
    await getMenus();
  });

  const { menus } = result.current;

  expect(menus[0].title).toStrictEqual(data.title);
});

test("test addPageFromMenu", async () => {
  const { result } = renderHook(() => useMenus(driver, pages));
  const { addPageFromMenu } = result.current;

  const menu: Menu = { ...data, pages: [] };

  await act(async () => {
    await addPageFromMenu(data.id, pages[0].id, menu)
      .then((value) => expect(value.pages[0].id).toStrictEqual(pages[0].id))
      .catch(() => expect(false).toBeTruthy());
  });
});

test("test removePageFromMenu", async () => {
  const { result } = renderHook(() => useMenus(driver, pages));
  const { removePageFromMenu } = result.current;

  const menu: Menu = { ...data, pages: [] };

  await act(async () => {
    await removePageFromMenu(data.id, pages[0].id, menu)
      .then((value) => expect(value.pages).toStrictEqual([]))
      .catch(() => expect(false).toBeTruthy());
  });
});

test("test removeMenu", async () => {
  const { result } = renderHook(() => useMenus(driver, pages));
  const { removeMenu } = result.current;

  await act(async () => {
    await removeMenu(data.id)
      .then((value) => expect(value).toStrictEqual([]))
      .catch(() => expect(false).toBeTruthy());
  });
});
