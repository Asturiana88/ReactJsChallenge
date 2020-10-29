import React from 'react'

const SideFilters = (props: { handler: (e: React.ChangeEvent<HTMLInputElement>) => void, value: string }) => {
    const { handler, value } = props
    return (
        <div className="c-sidebar c-sidebar-dark c-sidebar-show">
            <div className="d-flex flex-column">
                <h4>Filters</h4>
                <label>
                    <input
                        style={{ marginRight: 10 }}
                        type="radio"
                        value="characters"
                        name="filter"
                        onChange={handler}
                        checked={value === "characters"}
                    />
                    Characters
                </label>
                <label>
                    <input
                        style={{ marginRight: 10 }}
                        type="radio"
                        value="episodes"
                        name="filter"
                        onChange={handler}
                        checked={value === "episodes"}
                    />
                        Episodes
                </label>
                <label>
                    <input
                        style={{ marginRight: 10 }}
                        type="radio"
                        value="locations"
                        name="filter"
                        onChange={handler}
                        checked={value === "locations"}
                    />
                    Locations
                </label>
            </div>
        </div>
    )
}

export default SideFilters;