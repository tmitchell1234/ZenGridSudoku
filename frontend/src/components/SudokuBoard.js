import React, { useRef } from 'react';

import '../css/Board.css';

function SudokuBoard( {handleCellClick} )
{
    return(
        <table id="grid">
        <tr>
            <td class="cell" data-cell-id="00" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="01" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="02" onClick={(event) => handleCellClick(event)}></td>
          
            <td class="cell" data-cell-id="03" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="04" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="05" onClick={(event) => handleCellClick(event)}></td>
          
            <td class="cell" data-cell-id="06" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="07" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="08" onClick={(event) => handleCellClick(event)}></td>
        </tr>
        <tr>
            <td class="cell" data-cell-id="10" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="11" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="12" onClick={(event) => handleCellClick(event)}></td>
          
            <td class="cell" data-cell-id="13" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="14" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="15" onClick={(event) => handleCellClick(event)}></td>
          
            <td class="cell" data-cell-id="16" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="17" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="18" onClick={(event) => handleCellClick(event)}></td>
        </tr>
        <tr>
            <td class="cell" data-cell-id="20" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="21" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="22" onClick={(event) => handleCellClick(event)}></td>
          
            <td class="cell" data-cell-id="23" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="24" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="25" onClick={(event) => handleCellClick(event)}></td>
          
            <td class="cell" data-cell-id="26" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="27" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="28" onClick={(event) => handleCellClick(event)}></td>
        </tr>
        <tr>
            <td class="cell" data-cell-id="30" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="31" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="32" onClick={(event) => handleCellClick(event)}></td>
          
            <td class="cell" data-cell-id="33" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="34" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="35" onClick={(event) => handleCellClick(event)}></td>
          
            <td class="cell" data-cell-id="36" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="37" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="38" onClick={(event) => handleCellClick(event)}></td>
        </tr>
        <tr>
            <td class="cell" data-cell-id="40" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="41" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="42" onClick={(event) => handleCellClick(event)}></td>
          
            <td class="cell" data-cell-id="43" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="44" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="45" onClick={(event) => handleCellClick(event)}></td>
          
            <td class="cell" data-cell-id="46" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="47" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="48" onClick={(event) => handleCellClick(event)}></td>
        </tr>
        <tr>
            <td class="cell" data-cell-id="50" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="51" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="52" onClick={(event) => handleCellClick(event)}></td>
          
            <td class="cell" data-cell-id="53" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="54" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="55" onClick={(event) => handleCellClick(event)}></td>
          
            <td class="cell" data-cell-id="56" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="57" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="58" onClick={(event) => handleCellClick(event)}></td>
        </tr>
        <tr>
            <td class="cell" data-cell-id="60" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="61" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="62" onClick={(event) => handleCellClick(event)}></td>
          
            <td class="cell" data-cell-id="63" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="64" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="65" onClick={(event) => handleCellClick(event)}></td>
          
            <td class="cell" data-cell-id="66" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="67" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="68" onClick={(event) => handleCellClick(event)}></td>
        </tr>
        <tr>
            <td class="cell" data-cell-id="70" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="71" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="72" onClick={(event) => handleCellClick(event)}></td>
          
            <td class="cell" data-cell-id="73" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="74" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="75" onClick={(event) => handleCellClick(event)}></td>
          
            <td class="cell" data-cell-id="76" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="77" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="78" onClick={(event) => handleCellClick(event)}></td>
        </tr>
        <tr>
            <td class="cell" data-cell-id="80" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="81" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="82" onClick={(event) => handleCellClick(event)}></td>
          
            <td class="cell" data-cell-id="83" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="84" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="85" onClick={(event) => handleCellClick(event)}></td>
          
            <td class="cell" data-cell-id="86" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="87" onClick={(event) => handleCellClick(event)}></td>
            <td class="cell" data-cell-id="88" onClick={(event) => handleCellClick(event)}></td>
        </tr>
        </table>
    )
};

export default SudokuBoard;