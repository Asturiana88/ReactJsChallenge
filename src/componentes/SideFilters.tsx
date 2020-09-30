import React from 'react'

export default function SideFilters(props:{handler:(e:any)=>void, value:string}) {
    const {handler, value} = props
    return (
        <div className="c-sidebar c-sidebar-dark c-sidebar-show">
            <ul className="c-sidebar-nav">
                <div className="d-flex flex-column">
                    <h4>Filters</h4>
                <label>
                    <input
                        type="radio" 
                        value="characters" 
                        name="filter"
                        onChange={handler} 
                        checked={value==="characters"}
                    />
                    Characters
                </label> 
                <label>
                    <input 
                        type="radio"
                        value="episodes"
                        name="filter"
                        onChange={handler} 
                        checked={value==="episodes"}
                    />
                        Episodes
                </label> 
                <label>
                    <input 
                        type="radio" 
                        value="locations" 
                        name="filter" 
                        onChange={handler} 
                        checked={value==="locations"}
                    /> 
                    Locations
                </label>
                </div>
            </ul>
        </div>
    )
}
