const driver = process.env.REACT_APP_JOAZCO_CMS_DRIVER || "error";
import(`../drivers/${driver}/useInit`);

const useInit = () => {};

export default useInit;
