import "./dehumidifierStatus.css"

interface Props {
    currentDehumidifierStatus: boolean
}

function DehumidifierStatus(props: Props) {
  return (
    <div>
    <div className='statusDiv'>
        <h3>Current humidity status: </h3>
        <div style={{
            backgroundColor : props.currentDehumidifierStatus ? "red" : "green",
            width: "30px",
            height: "30px",
            borderRadius: "10px"
        }}></div>
    </div>
    <h3>{props.currentDehumidifierStatus ? "You should turn on your dehumidifier": "All good!"}</h3>
    </div>
)
}

export default DehumidifierStatus