let Home = () =>{
    return (
        <>
            <div style={{height:"50px"}}></div>
            <div style={{ padding: "40px", textAlign: "center" }}>
                <h1>Welcome to Smart Cinema</h1>
                <p style={{ marginTop: "15px", fontSize: "18px" }}>
                    Your movie booking experience is loading...
                </p>

                <div style={{ marginTop: "30px" }}>
                    <button
                        style={{
                            padding: "12px 24px",
                            fontSize: "16px",
                            borderRadius: "6px",
                            border: "none",
                            backgroundColor: "#ff4c4c",
                            color: "white",
                            cursor: "pointer"
                        }}
                    >
                        Explore Movies
                    </button>
                </div>
            </div>
        </>
    )
}
export default Home