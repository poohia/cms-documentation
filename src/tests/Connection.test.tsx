import { renderHook, act } from "@testing-library/react-hooks";
import {
  render,
  screen,
  act as actRender,
  waitFor,
} from "@testing-library/react";
import driver from "../drivers";
import { useConnection } from "../joazco/";
import Connection from "../admin/Connection";

const email = process.env.REACT_APP_JOAZCO_USER_TEST_USERNAME || "";
const password = process.env.REACT_APP_JOAZCO_USER_TEST_PASSWORD || "";

test("stay signIn", async () => {
  const { result } = renderHook(() => useConnection());
  const { signIn } = result.current;

  await act(async () => {
    await signIn(email, password);
  });

  const { data: user } = result.current;
  expect(user).toEqual(expect.objectContaining({ email }));
});

test("test getCurrentUser", async () => {
  const { result } = renderHook(() => useConnection());
  const { loadData } = result.current;

  await act(async () => {
    await loadData();
  });

  const { data: user } = result.current;
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
  const { result } = renderHook(() => useConnection());
  const { signOut } = result.current;

  await act(async () => {
    await signOut()
      .then(() => expect(true).toBeTruthy())
      .catch(() => expect(false).toBeTruthy());
  });
});
