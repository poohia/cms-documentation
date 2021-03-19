import { renderHook, act } from "@testing-library/react-hooks";
import * as cssValidator from "w3c-css-validator";
import { useConnection, useStylesheet } from "../joazco/hooks";
import driver from "../drivers";

const email = process.env.REACT_APP_JAZZI_USER_TEST_USERNAME || "";
const password = process.env.REACT_APP_JAZZI_USER_TEST_PASSWORD || "";

const data: string = ".myclass: {color: black}";
const dataWithEror: string = ".myclass: {color: 100px}";

test("stay signIn", async () => {
  const { result } = renderHook(() => useConnection(driver));
  const { signIn } = result.current;

  await act(async () => {
    await signIn(email, password);
  });

  const { logged } = result.current;
  expect(logged).toBeTruthy();
});

test("test isertStylesheet", async () => {
  const { result } = renderHook(() => useStylesheet(driver));
  const { insertStylesheet } = result.current;

  await act(async () => {
    await insertStylesheet(data);
  });

  const { stylesheet } = result.current;
  expect(stylesheet).toStrictEqual(data);
});

test("test getSeo", async () => {
  const { result } = renderHook(() => useStylesheet(driver));
  const { getStylesheet } = result.current;

  await act(async () => {
    await getStylesheet();
  });

  const { stylesheet } = result.current;
  expect(stylesheet).toStrictEqual(data);
});

test("test validator css function", async () => {
  await act(async () => {
    await cssValidator
      .validateText(dataWithEror)
      .then((response) => expect(response.valid).toBeFalsy())
      .catch(() => expect(false).toBeTruthy());
  });
});
