/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {RNTesterModuleExample} from '../../types/RNTesterTypes';

import * as React from 'react';
import {useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';

const COLORS = ['#f4a261', '#2a9d8f', '#e76f51', '#457b9d', '#8ab17d'];
const ROWS = Array.from({length: 12}, (_, i) => i);

function Column({
  label,
  withRefreshControl,
  overflowVisible,
}: {
  label: string,
  withRefreshControl: boolean,
  overflowVisible: boolean,
}): React.Node {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };
  return (
    <View style={styles.column}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <ScrollView
        style={[styles.list, overflowVisible && styles.overflowVisible]}
        refreshControl={
          withRefreshControl ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : undefined
        }>
        {ROWS.map(i => (
          <View
            key={i}
            style={[styles.row, {backgroundColor: COLORS[i % COLORS.length]}]}>
            <Text style={styles.rowText}>{i}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function Playground(): React.Node {
  return (
    <View style={styles.container}>
      <Column
        label={"overflow: 'visible'\nno RefreshControl"}
        withRefreshControl={false}
        overflowVisible={true}
      />
      <Column
        label={"overflow: 'visible'\n+ RefreshControl"}
        withRefreshControl={true}
        overflowVisible={true}
      />
      <Column
        label={'default overflow\n+ RefreshControl'}
        withRefreshControl={true}
        overflowVisible={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
    marginHorizontal: 4,
  },
  container: {
    flexDirection: 'row',
    paddingTop: 8,
  },
  header: {
    backgroundColor: '#264653',
    height: 64,
    justifyContent: 'center',
  },
  label: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  list: {
    borderColor: 'red',
    borderWidth: 2,
    height: 240,
  },
  overflowVisible: {
    overflow: 'visible',
  },
  row: {
    alignItems: 'center',
    height: 56,
    justifyContent: 'center',
  },
  rowText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default {
  title: 'Playground',
  name: 'playground',
  description: 'Test out new features and ideas.',
  render: (): React.Node => <Playground />,
} as RNTesterModuleExample;
