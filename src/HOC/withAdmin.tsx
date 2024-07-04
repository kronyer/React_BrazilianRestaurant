import { jwtDecode } from "jwt-decode";

const withAdmin = (WrappedComponent: any) => {
  return (props: any) => {
    const accessToken = localStorage.getItem("token") ?? "";
    if (accessToken) {
      const decode: {
        role: string;
      } = jwtDecode(accessToken);

      if (decode.role !== "admin") {
        window.location.replace("/accessDenied");
        return null;
      }
    } else {
      window.location.replace("/login");
    }
    return <WrappedComponent {...props}></WrappedComponent>;
  };
};

export default withAdmin;
