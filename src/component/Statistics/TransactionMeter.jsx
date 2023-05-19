import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';


import {Pie} from 'react-chartjs-2';
import {useEffect, useRef, useState} from "react";
import UtilServices from "../../services/utils.service.js";


ChartJS.register(ArcElement, Tooltip, Legend, Title)

export default function TransactionMeter(props) {
    const gaugeChart = {
        id: 'gaugeChart',
        afterDatasetDraw: (chart, args, options) => {
            if (!(options.current && options.limit)) {
                return;
            }

            const {
                ctx, data, chartArea: {top, bottom, left, right, width, height},
                scales: {r}
            } = chart;

            function textLabel(text, x, y, fontSize, textBaseLine, textAlign) {
                var size = Math.round(width / 32 * fontSize);
                ctx.font = `${size}px sans-serif`
                ctx.fillStyle = "#666"
                ctx.textBaseline = textBaseLine;
                ctx.textAlign = textAlign;
                ctx.fillText(text, x, y)
            }

            ctx.save();
            const xCoor = chart.getDatasetMeta(0).data[0].x;
            const yCoor = chart.getDatasetMeta(0).data[0].y;
            const score = options.current
            const max = options.limit


            textLabel('0', left, yCoor + 20, 1, 'top', 'left');
            textLabel(UtilServices.to_rupiah(max), right, yCoor + 20, 1, 'top', 'right');
            textLabel(UtilServices.to_rupiah(score), xCoor, yCoor, 1.2, 'bottom', 'center');
            textLabel(options.title, xCoor, yCoor-70, 0.6, 'bottom', 'center');

            ctx.restore()
        }
    }
    const chartRef = useRef(null);
    const [gradient_color, setGradient_color] = useState('rgba(255,26,104,0.21)');
    const current = props.current ?? 0;
    const leftover = (props.max ?? 100) - current;

    useEffect(() => {
        const context = chartRef.current;
        if (context) {
            const {ctx,width} = context;
            const gradient = ctx.createLinearGradient(0, 0, width, 0);
            gradient.addColorStop(0, 'green');
            gradient.addColorStop(0.6, 'yellow');
            gradient.addColorStop(1, 'red');
            setGradient_color(gradient)
        }

    }, []);
    const data = {
        labels: ["Score", "Gray Area"],
        datasets: [{
            data: [current, leftover < 0 ? 0 : leftover],
            backgroundColor: [
                gradient_color,
                'rgba(0,0,0,0.2)'
            ],
            borderColor: [
                gradient_color,
                'rgba(0,0,0,0.2)'
            ],
            borderWidth: 1,
            cutout: "90%",
            circumference: 180,
            rotation: 270
        }]
    }

    const options = {
        aspectRatio: 1.5,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            },
            gaugeChart: {
                limit: props.max,
                current: props.current,
                title:props.title,
            }, maintainAspectRatio: false, responsive: true
        }
    }


    return (
        <Pie ref={chartRef} data={data} options={options} plugins={[gaugeChart]}/>
    );
}