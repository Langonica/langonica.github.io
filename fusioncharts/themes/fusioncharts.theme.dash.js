/*
 Dash Theme v0.0.1
 FusionCharts JavaScript Library

 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>
*/
FusionCharts.register('theme', {
    name: 'dash',
    theme: {
        base: {
            chart: {
                paletteColors: '#04476c,#4d998d,#77be99,#a7dca6,#cef19a,#0e948c,#64ad93,#8fcda0,#bbe7a0,#dcefc1',
                labelDisplay: 'auto',
                baseFontColor: '#333333',
                baseFont: 'Open Sans,Helvetica Neue,Arial',
                captionFontSize: '14',
                subcaptionFontSize: '14',
                subcaptionFontBold: '0',
                showBorder: '0',
                bgColor: 'none',
                bgAlpha: '0,0',
                showShadow: '0',
                canvasBgColor: 'none',
                canvasBgAlpha: '0,0',
                showCanvasBorder: '0',
                useplotgradientcolor: '0',
                useRoundEdges: '0',
                showPlotBorder: '0',
                showAlternateHGridColor: '0',
                showAlternateVGridColor: '0',
                toolTipColor: '#ffffff',
                toolTipBorderThickness: '0',
                toolTipBgColor: '#000000',
                toolTipBgAlpha: '80',
                toolTipBorderRadius: '2',
                toolTipPadding: '5',
                showToolTip: '0',
                legendBgAlpha: '0',
                legendBorderAlpha: '0',
                legendShadow: '0',
                legendItemFontSize: '10',
                legendItemFontColor: '#666666',
                legendCaptionFontSize: '9',
                divlineAlpha: '100',
                divlineColor: '#999999',
                divlineThickness: '1',
                divLineDashed: '1',
                divLineDashLen: '1',
                divLineGapLen: '1',
                scrollheight: '10',
                flatScrollBars: '1',
                scrollShowButtons: '0',
                scrollColor: '#cccccc',
                showHoverEffect: '1',
                valueFontSize: '10',
                showXAxisLine: '1',
                xAxisLineThickness: '1',
                xAxisLineColor: '#999999'
            },
            dataset: [{}],
            trendlines: [{}]
        },
        geo: {
            chart: {
                showLabels: '0',
                fillColor: '#04476c',
                showBorder: '1',
                borderColor: '#eeeeee',
                borderThickness: '1',
                borderAlpha: '50',
                entityFillhoverColor: '#04476c',
                entityFillhoverAlpha: '80'
            }
        },
        pie2d: {
            chart: {
                placeValuesInside: '0',
                use3dlighting: '0',
                valueFontColor: '#333333',
                captionPadding: '15'
            },
            data: function (index, dataItem, dataLength) {
                var math = window.Math,
                    alphaSlab = dataLength > 50 ?
                        math.round(100 / math.ceil(dataLength / 10)) : 20,
                    alpha = 100 - alphaSlab * math.floor(index / 10);
                return {alpha: alpha};
            }
        },
        doughnut2d: {
            chart: {
                placeValuesInside: '0',
                use3dlighting: '0',
                valueFontColor: '#333333',
                centerLabelFontSize: '12',
                centerLabelBold: '1',
                centerLabelFontColor: '#333333',
                captionPadding: '15'
            },
            data: function (index, dataItem, dataLength) {
                var math = window.Math,
                    alphaSlab = dataLength > 50 ?
                        math.round(100 / math.ceil(dataLength / 10)) : 20,
                    alpha = 100 - alphaSlab * math.floor(index / 10);
                return {alpha: alpha};
            }
        },
        line: {
            chart: {
                lineThickness: '2'
            }
        },
        spline: {
            chart: {
                lineThickness: '2'
            }
        },
        column2d: {
            chart: {
                paletteColors: '#04476c',
                valueFontColor: '#ffffff',
                placeValuesInside: '1',
                rotateValues: '1'
            }
        },
        bar2d: {
            chart: {
                paletteColors: '#04476c',
                valueFontColor: '#ffffff',
                placeValuesInside: '1'
            }
        },
        column3d: {
            chart: {
                paletteColors: '#04476c',
                valueFontColor: '#ffffff',
                placeValuesInside: '1',
                rotateValues: '1'
            }
        },
        bar3d: {
            chart: {
                paletteColors: '#04476c',
                valueFontColor: '#ffffff',
                placeValuesInside: '1'
            }
        },
        area2d: {
            chart: {
                valueBgColor: '#ffffff',
                valueBgAlpha: '90',
                valueBorderPadding: '-2',
                valueBorderRadius: '2'
            }
        },
        splinearea: {
            chart: {
                valueBgColor: '#ffffff',
                valueBgAlpha: '90',
                valueBorderPadding: '-2',
                valueBorderRadius: '2'
            }
        },
        mscolumn2d: {
            chart: {
                valueFontColor: '#ffffff',
                placeValuesInside: '1',
                rotateValues: '1'
            }
        },
        mscolumn3d: {
            chart: {
                showValues: '0'
            }
        },
        msstackedcolumn2dlinedy: {
            chart: {
                showValues: '0'
            }
        },
        stackedcolumn2d: {
            chart: {
                showValues: '0'
            }
        },
        stackedarea2d: {
            chart: {
                valueBgColor: '#ffffff',
                valueBgAlpha: '90',
                valueBorderPadding: '-2',
                valueBorderRadius: '2'
            }
        },
        stackedbar2d: {
            chart: {
                showValues: '0'
            }
        },
        msstackedcolumn2d: {
            chart: {
                showValues: '0'
            }
        },
        mscombi3d: {
            chart: {
                showValues: '0'
            }
        },
        mscombi2d: {
            chart: {
                showValues: '0'
            }
        },
        mscolumn3dlinedy: {
            chart: {
                showValues: '0'
            }
        },
        stackedcolumn3dline: {
            chart: {
                showValues: '0'
            }
        },
        stackedcolumn2dline: {
            chart: {
                showValues: '0'
            }
        },
        scrollstackedcolumn2d: {
            chart: {
                valueFontColor: '#ffffff'
            }
        },
        scrollcombi2d: {
            chart: {
                showValues: '0'
            }
        },
        scrollcombidy2d: {
            chart: {
                showValues: '0'
            }
        },
        logstackedcolumn2d: {
            chart: {
                showValues: '0'
            }
        },
        logmsline: {
            chart: {
                showValues: '0'
            }
        },
        logmscolumn2d: {
            chart: {
                showValues: '0'
            }
        },
        msstackedcombidy2d: {
            chart: {
                showValues: '0'
            }
        },
        scrollcolumn2d: {
            chart: {
                valueFontColor: '#ffffff',
                placeValuesInside: '1',
                rotateValues: '1'
            }
        },
        pareto2d: {
            chart: {
                paletteColors: '#04476c',
                showValues: '0'
            }
        },
        pareto3d: {
            chart: {
                paletteColors: '#04476c',
                showValues: '0'
            }
        },
        angulargauge: {
            chart: {
                pivotFillColor: '#ffffff',
                pivotRadius: '4',
                gaugeFillMix: '{light+0}',
                showTickValues: '1',
                majorTMHeight: '12',
                majorTMThickness: '2',
                majorTMColor: '#000000',
                minorTMNumber: '0',
                tickValueDistance: '10',
                valueFontSize: '24',
                valueFontBold: '1',
                gaugeInnerRadius: '50%',
                showHoverEffect: '0'
            },
            dials: {
                dial: [{
                    baseWidth: '10',
                    rearExtension: '7',
                    bgColor: '#000000',
                    bgAlpha: '100',
                    borderColor: '#666666',
                    bgHoverAlpha: '20'
                }]
            }
        },
        hlineargauge: {
            chart: {
                pointerFillColor: '#ffffff',
                gaugeFillMix: '{light+0}',
                showTickValues: '1',
                majorTMHeight: '3',
                majorTMColor: '#000000',
                minorTMNumber: '0',
                valueFontSize: '18',
                valueFontBold: '1'
            },
            pointers: {
                pointer: [{}]
            }
        },
        bubble: {
            chart: {
                use3dlighting: '0',
                showplotborder: '0',
                showYAxisLine: '1',
                yAxisLineThickness: '1',
                yAxisLineColor: '#999999',
                showAlternateHGridColor: '0',
                showAlternateVGridColor: '0'
            },
            categories: [{
                verticalLineDashed: '1',
                verticalLineDashLen: '1',
                verticalLineDashGap: '1',
                verticalLineThickness: '1',
                verticalLineColor: '#000000',
                category: [{}]
            }],
            vtrendlines: [{
                line: [{
                    alpha: '0'
                }]
            }]
        },
        scatter: {
            chart: {
                use3dlighting: '0',
                showYAxisLine: '1',
                yAxisLineThickness: '1',
                yAxisLineColor: '#999999',
                showAlternateHGridColor: '0',
                showAlternateVGridColor: '0'
            },
            categories: [{
                verticalLineDashed: '1',
                verticalLineDashLen: '1',
                verticalLineDashGap: '1',
                verticalLineThickness: '1',
                verticalLineColor: '#000000',
                category: [{}]
            }],
            vtrendlines: [{
                line: [{
                    alpha: '0'
                }]
            }]
        },
        boxandwhisker2d: {
            chart: {
                valueBgColor: '#ffffff',
                valueBgAlpha: '90',
                valueBorderPadding: '-2',
                valueBorderRadius: '2'
            }
        },
        thermometer: {
            chart: {
                
                lowerLimit: '-10',
      			upperLimit: '120',
      			decimals: '1',
      			numberSuffix: '°F',
      			showhovereffect: '0',
      			thmBulbRadius: "12",
      			thmHeight: '65',
      			showGaugeBorder: '1',
      			gaugeBorderColor: '#008ee4',
      			showTickMarks: '1',
      			showTickValues: '1',
      			ticksOnRight: '0',
      			tickFontColor: '#fff',
      			gaugeBorderThickness: '2',
      			gaugeBorderColor: '#fff',
      			gaugeBorderAlpha: '30',
      			thmOriginX: '50',
      			chartBottomMargin: '0',
      			valueFontColor: '#fff',
      			valueFontSize: '18px'
                
            }
        },
        cylinder: {
            chart: {
                cylFillColor: '#04476c'
            }
        },
        sparkline: {
            chart: {
                linecolor: '#04476c'
            }
        },
        sparkcolumn: {
            chart: {
                plotFillColor: '#04476c'
            }
        },
        sparkwinloss: {
            chart: {
                winColor: '#04476c',
                lossColor: '#4d998d',
                drawColor: '#77be99',
                scoreLessColor: '#a7dca6'
            }
        },
        hbullet: {
            chart: {
                plotFillColor: '#04476c',
                targetColor: '#4d998d'
            }
        },
        vbullet: {
            chart: {


            }
        }
    }
});