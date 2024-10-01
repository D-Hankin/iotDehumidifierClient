
interface Props {
    header: string
}

function Header(props: Props) {
  return (
    <h1>{props.header}</h1>
  )
}

export default Header