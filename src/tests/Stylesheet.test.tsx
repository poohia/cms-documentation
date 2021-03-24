import { renderHook, act } from "@testing-library/react-hooks";
import * as cssValidator from "w3c-css-validator";
import { useConnection, useStylesheet } from "../joazco";

const email = process.env.REACT_APP_JOAZCO_USER_TEST_USERNAME || "";
const password = process.env.REACT_APP_JOAZCO_USER_TEST_PASSWORD || "";

const data: string = ".myclass: {color: black}";
const dataWithEror: string = ".myclass: {color: 100px}";

test("stay signIn", async () => {
  const { result } = renderHook(() => useConnection());
  const { signIn } = result.current;

  await act(async () => {
    await signIn(email, password);
  });

  const { data: user } = result.current;
  expect(user).toEqual(expect.objectContaining({ email }));
});

test("test insertStylesheet", async () => {
  const { result } = renderHook(() => useStylesheet());
  const { insertStylesheet } = result.current;

  await act(async () => {
    await insertStylesheet(data);
  });

  const { data: stylesheet } = result.current;
  expect(stylesheet).toStrictEqual(data);
});

test("test getSeo", async () => {
  const { result } = renderHook(() => useStylesheet());
  const { loadData } = result.current;

  await act(async () => {
    await loadData();
  });

  const { data: stylesheet } = result.current;
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
