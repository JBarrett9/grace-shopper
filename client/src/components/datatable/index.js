import React from "react";

export default function Datatable({ data }) {
  const columns = data[0] && Object.keys(data[0]);

  return (
    <table cellPadding={2} cellSpacing={2}>
      <thead>
        <tr>
          {data[0] &&
            columns.map((heading) => <th>{heading.toUpperCase()}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr>
            {columns.map((column) => (
              <td>
                {typeof row[column] === "boolean" ? (
                  <>
                    <input
                      type="checkbox"
                      value={row[column]}
                      checked={row[column]}
                      disabled={true}
                    ></input>
                  </>
                ) : column === "createddate" || column === "birthday" ? (
                  ((column = new Date(row[column])),
                  column.toISOString().substring(0, 10))
                ) : (
                  row[column]
                )}
              </td>
            ))}
            <td>
              <button>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
