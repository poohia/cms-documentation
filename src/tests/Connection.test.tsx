import { renderHook, act } from "@testing-library/react-hooks";
import {
  render,
  screen,
  act as actRender,
  waitFor,
} from "@testing-library/react";
import driver from "../drivers";
import { useConnection } from "../joazco/hooks";
import JoazcoProvider from "../joazco";
import Connection from "../admin/Connection";

const email = process.env.REACT_APP_JOAZCO_USER_TEST_USERNAME || "";
const password = process.env.REACT_APP_JOAZCO_USER_TEST_PASSWORD || "";

test("test signIn", async () => {
  const { result } = renderHook(() => useConnection(driver));
  const { signIn } = result.current;

  await act(async () => {
    await signIn(email, password);
  });

  const { logged } = result.current;
  expect(logged).toBeTruthy();
});

test("test getCurrentUser", async () => {
  const { result } = renderHook(() => useConnection(driver));
  const { getCurrentUser } = result.current;

  await act(async () => {
    await getCurrentUser();
  });

  const { user } = result.current;
  expect(user && user.email).toStrictEqual(email);
});

// test("test render Connection", async () => {
//   const { result, waitForNextUpdate } = renderHook(() => useConnection(driver));
//   const { signIn, getCurrentUser } = result.current;
//   // let component: any;
//   // act(() => {
//   // actRender(() => {
//   //   component = create(
//   //     <JoazcoProvider>
//   //       <Connection />
//   //     </JoazcoProvider>
//   //   );
//   // });
//   // });
//   // const instance = component.root;
//   actRender(() => {
//     render(
//       <JoazcoProvider driver={driver}>
//         <Connection />
//       </JoazcoProvider>
//     );
//   });
//   const loadingElement = screen.getByText(/loading.../i);
//   expect(loadingElement).toBeInTheDocument();
//   await waitFor(() => screen.getByText("login"));
// });

test("test signOut", async () => {
  const { result } = renderHook(() => useConnection(driver));
  const { signOut } = result.current;

  await act(async () => {
    await signOut();
  });

  const { logged } = result.current;
  expect(logged).toBeFalsy();
});
