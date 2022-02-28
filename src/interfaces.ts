/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

// powerbi
import powerbi from "powerbi-visuals-api";
import DataView = powerbi.DataView;
import IPromise = powerbi.IPromise;
import PrimitiveValue = powerbi.PrimitiveValue;
import ValueTypeDescriptor = powerbi.ValueTypeDescriptor;

// powerbi.extensibility.utils.interactivity
import {
    interactivitySelectionService,
} from "powerbi-visuals-utils-interactivityutils";
import SelectableDataPoint = interactivitySelectionService.SelectableDataPoint;

import * as THREE from 'three';

import { ILocation } from "./geocoder/geocoder";
import { GlobeMapSettings } from './settings'

export interface ILocalVisualStorageService {
    /**
     * Checks if the local storage is enabled for use.
     * 
     * @returns true if the local storage is enabled and false otherwise
     */
    enabled(): IPromise<boolean>;

    /**
     * Returns promise that resolves to the data associated with 'key' if it was found or rejects otherwise.
     * 
     * @param key - the name of the payload to retrieve
     * @returns the promise that resolves to the data required or rejects if it wasn't found
     */
    get(key: string): IPromise<string>;

    /**
     * Saves the data to local storage. This data can be later be retrieved using the 'key'.
     * Returns a promise that resolves to the amount of free space available to caller after the save if there 
     * is any or rejects otherwise. 
     * 
     * @param key - the name of the payload to store
     * @param data - the payload string to store
     * @returns the promise resolves to the amount of free space available or rejects if there is no free space to store the data
     */
    set(key: string, data: string): IPromise<number>;

    /**
     * Deletes data associated with 'key' from local storage.
     * 
     * @param key - the name of the payload to remove
     */
    remove(key: string): void;
}

export interface GlobeMapData {
    dataView: DataView;
    settings: GlobeMapSettings;
    dataPoints: GlobeMapDataPoint[];
    seriesDataPoints: GlobeMapSeriesDataPoint[];
}

export interface GlobeMapDataPoint {
    location: ILocation;
    place: string;
    locationType: string;
    placeKey: string;
    height: number;
    heightBySeries: number[];
    seriesToolTipData: {};
    heat: number;
    toolTipData: {};
}

export interface GlobeMapSeriesDataPoint extends SelectableDataPoint {
    label: string;
    color: string;
    category?: string;
}

export interface BingMetadata {
    resourceSets: ResourceSet[];
    statusCode: string;
    statusDescription: string;
}

export interface ResourceSet {
    resources: BingResourceMetadata[];
}

export interface BingResourceMetadata {
    imageHeight: number;
    imageWidth: number;
    imageUrl: string;
    imageUrlSubdomains: string[];
}

export interface TileMap {
    [quadKey: string]: string;
}

export interface ICanvasCoordinate {
    x: number;
    y: number;
}

export interface IGlobeMapValueTypeDescriptor extends ValueTypeDescriptor {
    category: string;
}

export interface IGlobeMapToolTipData {
    location: PrimitiveValue;
    longitude: PrimitiveValue;
    latitude: PrimitiveValue;
    series: PrimitiveValue;
    height: PrimitiveValue;
    heat: PrimitiveValue;
}

export interface IGlobeMapObject3DWithToolTipData extends THREE.Object3D {
    toolTipData: IGlobeMapToolTipData;
}

export interface ITileGapObject {
    gaps: number[][];
    rank: number;
}