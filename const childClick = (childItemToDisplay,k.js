const childClick = (childItemToDisplay,key, index) => {
      let child_index =  index
      let childName= childItemToDisplay 
      let parentName= activeParentItem 
      let parent_index= dynamicFiltersListItems.findIndex( p => p.title == activeParentItem)
      
      
      if (!selectedChildItems.includes(childName)){
        const temp_filter = [...selectedFiltersList,{
          "child" : child_index,
          "child_name": childName,
          "parent_name" : parentName,
          "parent" : parent_index
        }]
        const child_Items = [...selectedChildItems,childName]
        const parent_Items = [...selectedParentItems,parentName]
        setSelectedFiltersList([...temp_filter])
        setSelectedChildItems([...child_Items])
        setSelectedParentItems([...parent_Items])
        //console.log(selectedChildItems.includes(childName), selectedChildItems, selectedFiltersList)
      } else if (selectedChildItems.includes(childName)){
        let updated_filter = JSON.parse(JSON.stringify(selectedFiltersList))
        let updated_child_items = selectedChildItems
        let updated_parent_items = selectedParentItems
        const index = updated_filter.findIndex(obj => obj.child_name === childName && obj.parent_name == parentName);
        if(index > -1){
          updated_filter.splice(index,1)
        } 
        const childIndex = updated_child_items.indexOf(childName)    
        if(childIndex>-1){
          updated_child_items.splice(childIndex,1)
        } 
        const parentIndex = updated_parent_items.indexOf(parentName)
        if (parentIndex > -1){
          updated_parent_items.splice(parentIndex,1)
        }
        setSelectedParentItems(updated_parent_items)
        setSelectedFiltersList(updated_filter)
        setSelectedChildItems(updated_child_items)
        //console.log(selectedChildItems.includes(childName), selectedChildItems, selectedFiltersList)
      }
    }