interface Props {
    logoutReturn: () => void
}

function Logout(props: Props) {


    const logout = () => {
        localStorage.removeItem("token");
        props.logoutReturn();
    }

  return (
    <button onClick={logout}>Log Out</button>
  )
}

export default Logout