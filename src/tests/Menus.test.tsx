import { renderHook, act } from "@testing-library/react-hooks";
import arrayMove from "array-move";
import { useConnection, useNav, usePages } from "../joazco";
import { Menu, Page } from "../types";

const email = process.env.REACT_APP_JOAZCO_USER_TEST_USERNAME || "";
const password = process.env.REACT_APP_JOAZCO_USER_TEST_PASSWORD || "";

const data: Menu = {
  id: "123467",
  title: "My menu",
  caption: "caption",
  pages: [],
};

const pages: Page[] = [
  {
    id: "testMenu",
    content: "",
    slug: "test-menu",
    title: "test",
  },
  {
    id: "testMenu2",
    content: "",
    slug: "test-menu-2",
    title: "test",
  },
];

test("stay signIn", async () => {
  const { result } = renderHook(() => useConnection());
  const { signIn } = result.current;

  await act(async () => {
    await signIn(email, password);
  });

  const { data: user } = result.current;
  expect(user).toEqual(expect.objectContaining({ email }));
});

test("test createMenu", async () => {
  const { result } = renderHook(() => useNav());
  const { createMenu } = result.current;

  await act(async () => {
    await createMenu(data.title, data.caption, data.id);
  });

  const { data: menus } = result.current;
  expect(menus).toStrictEqual([data]);
});

test("test getMenus", async () => {
  const { result } = renderHook(() => useNav());
  const { loadData } = result.current;

  await act(async () => {
    await loadData();
  });

  const { data: menus } = result.current;

  expect(menus).toStrictEqual([data]);
});

test("test addPageFromMenu", async () => {
  const { result: resultPage } = renderHook(() => usePages());
  const { result } = renderHook(() => useNav());
  const { loadData } = result.current;

  const { createPage } = resultPage.current;

  await act(async () => {
    await createPage(pages[0].title, pages[0].slug, pages[0].id);
  });

  await act(async () => {
    await loadData();
  });

  const { data: ps } = resultPage.current;

  const pageFind = ps.find((p) => p.slug === pages[0].slug);

  expect(pageFind).toStrictEqual(pages[0]);

  if (pageFind) {
    const { addPageToMenu } = result.current;

    await act(async () => {
      await addPageToMenu(data.id, pageFind.id);
    });

    const { data: menus } = result.current;
    expect(menus).toStrictEqual([{ ...data, pages: [{ ...pages[0] }] }]);
  }
});

test("test updatePagesFromMenu", async () => {
  const { result: resultPage } = renderHook(() => usePages());
  const { result } = renderHook(() => useNav());
  const { loadData } = result.current;

  const { createPage } = resultPage.current;

  await act(async () => {
    await createPage(pages[1].title, pages[1].slug, pages[1].id);
  });

  await act(async () => {
    await loadData();
  });

  const { data: ps } = resultPage.current;

  const pageFind = ps.find((p) => p.slug === pages[1].slug);

  expect(pageFind).toStrictEqual(pages[1]);

  if (pageFind) {
    const { addPageToMenu, updatePagesFromMenu } = result.current;

    await act(async () => {
      await addPageToMenu(data.id, pageFind.id);
    });

    const { data: menus } = result.current;
    const newPages = arrayMove(menus[0].pages, 0, 1);

    await act(async () => {
      await updatePagesFromMenu(menus[0].id, newPages);
    });

    const { data: menusUpdate } = result.current;
    expect(menusUpdate[0].pages).toStrictEqual(newPages);
  }
});

test("test removePageFromMenu", async () => {
  const { result: resultPage } = renderHook(() => usePages());
  const { result } = renderHook(() => useNav());
  const { removePage } = resultPage.current;

  await act(async () => {
    await removePage(pages[0].id);
  });

  await act(async () => {
    await removePage(pages[1].id);
  });

  const { data: ps } = resultPage.current;
  const pageFind = ps.find((p) => p.slug === pages[0].slug);

  expect(pageFind).toStrictEqual(undefined);

  const { removePageFromMenu } = result.current;

  await act(async () => {
    await removePageFromMenu(data.id, pages[0].id);
  });
  await act(async () => {
    await removePageFromMenu(data.id, pages[1].id);
  });
  const { data: menus } = result.current;
  expect(menus).toStrictEqual([data]);
});

test("test updateMenu", async () => {
  const { result } = renderHook(() => useNav());

  const { loadData } = result.current;

  await act(async () => {
    await loadData();
  });

  const { updateMenu } = result.current;

  await act(async () => {
    await updateMenu(data.id, "new title", "new caption");
  });

  const { data: menus } = result.current;
  expect(menus).toStrictEqual([
    { ...data, title: "new title", caption: "new caption" },
  ]);
});

test("test removeMenu", async () => {
  const { result } = renderHook(() => useNav());

  const { loadData } = result.current;

  await act(async () => {
    await loadData();
  });

  const { removeMenu } = result.current;

  await act(async () => {
    await removeMenu(data.id);
  });

  const { data: menus, loading } = result.current;
  expect(menus).toStrictEqual([]);
});
