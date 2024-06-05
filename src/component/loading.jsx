function Loading(props){
    return(<div style={props.loading ? ({ }) : ({  display:"none"  })} className="loading"></div>)
}
export default Loading;