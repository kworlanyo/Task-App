 import React, { useState } from 'react';
 
 function TaskPriority() {
    const [priority, setPriority] = useState(false);

   return (
    <> 
        <div>
             <label> 🚨 Is it a priority?
                <input type="checkbox" checked={priority} onChange={(e) => setPriority(e.target.checked)} /> 
            </label>
         </div>
     </>
   )
 }
 
 export default TaskPriority