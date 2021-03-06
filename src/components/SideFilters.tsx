import React from 'react'

interface Props {
    handler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    dataAttribute: string
}

const SideFilters = ({ handler, dataAttribute }: Props) => (
    <div className="c-sidebar c-sidebar-dark c-sidebar-show">
        <div className="d-flex flex-column">
            <h4>Filters</h4>
            <label>
                <input
                    className="mr-2"
                    type="radio"
                    value="characters"
                    name="filter"
                    onChange={handler}
                    checked={dataAttribute === "characters"}
                />
                    Characters
                </label>
            <label>
                <input
                    className="mr-2"
                    type="radio"
                    value="episodes"
                    name="filter"
                    onChange={handler}
                    checked={dataAttribute === "episodes"}
                />
                        Episodes
                </label>
            <label>
                <input
                    className="mr-2"
                    type="radio"
                    value="locations"
                    name="filter"
                    onChange={handler}
                    checked={dataAttribute === "locations"}
                />
                    Locations
                </label>
        </div>
    </div>
)

export default SideFilters;