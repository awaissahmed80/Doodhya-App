import React, {useState, forwardRef, useImperativeHandle} from "react"
import { Box, Button, FlatList } from 'native-base'
import { weekdays, addOrRemove } from '../../helpers'
import dayjs from "dayjs"

export const DaySelector = forwardRef((props, ref) => {

    const [ selected, setSelected ] = useState([])
    const days = weekdays()

    const numericalSort = (a, b) => {
        return parseInt(a, 10) - parseInt(b, 10);
      };

    useImperativeHandle(ref, () => ({
        getDays: () => selected.sort(numericalSort),
    }),[selected]);
    

    return(
        <Box {...props}>
            {/* <Text mb={2} fontWeight={600}>Days</Text> */}
            <FlatList 
                horizontal={true}
                data={days}
                px={5}
                contentContainerStyle={styles.list}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item, index}) =>
                    <Button 
                        colorScheme={selected?.includes(dayjs(item).format('d')+"") ? "primary" : "gray"} 
                        p={0}      
                        m={2}                   
                        onPress={() => setSelected([...addOrRemove(selected, dayjs(item).format('d'))])} 
                        // onPress={() => handleSelected(dayjs(day).format('d'))}
                        variant={selected.includes(dayjs(item).format('d')) ? "solid" : "subtle"} 
                        _text={{ fontSize: "14px", textTransform: "uppercase" }} 
                        rounded="full" 
                        alignItems="center" 
                        justifyContent="center" 
                        key={index} 
                        boxSize="48px"
                        >                        
                        {dayjs(item).format('dd')}
                        
                    </Button>
                }                
            />                   
        </Box>
    )
})

const styles = {
    list: {
        paddingRight: 30
    }
}