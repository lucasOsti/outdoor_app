import React, { Component } from 'react';
import { View } from 'react-native';
import { VictoryArea,VictoryChart } from "victory-native";


export default class LineChart extends Component {
   render() {
        let dataPadding = (this.props.max - this.props.min) * 0.1;

        return (
            <View>
                {this.props.data.length > 1 &&
                    <VictoryChart 
                        height={100} 
                        width={400} 
                        padding={{ top: 10, bottom: 10, left: 65, right: 10 }}>
                            <VictoryArea
                                interpolation="natural"
                                domain={{y: [this.props.min - dataPadding, this.props.max + dataPadding]}}
                                style={{ data: { fill: this.props.color } }}
                                animate={{
                                    duration: 500,
                                    onLoad: { duration: 500 }
                                }}
                                data={ this.props.data }
                            />
                    </VictoryChart>
                }
            </View>
        );
    }
}

