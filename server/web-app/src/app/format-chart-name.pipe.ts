import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatChartName'
})
export class FormatChartNamePipe implements PipeTransform {

  transform(metricsManagerName: string, statistic: string): string {
    let formatedName =
        (`${metricsManagerName}-${statistic}`)
            .replace(/([A-Z])/g, '-$1')
            .toLowerCase() +
        '-chart-container';
    return formatedName;
  }
}
